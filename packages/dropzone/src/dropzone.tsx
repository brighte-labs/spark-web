import { css } from '@emotion/css';
import { useFocusRing, VisuallyHidden } from '@spark-web/a11y';
import { Alert } from '@spark-web/alert';
import { Box } from '@spark-web/box';
import { useFieldContext } from '@spark-web/field';
import { DocumentTextIcon, UploadIcon, XIcon } from '@spark-web/icon';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { TextList } from '@spark-web/text-list';
import { useTheme } from '@spark-web/theme';
import { mergeRefs } from '@spark-web/utils';
import type { InputHTMLAttributes } from 'react';
import { forwardRef, useEffect, useState } from 'react';
import type {
  ErrorCode as DropzoneErrorCode,
  FileWithPath,
} from 'react-dropzone';
import { useDropzone } from 'react-dropzone';

import type { AcceptedType } from './mime-type-to-file-extension';
import { mimeTypeToFileExtension } from './mime-type-to-file-extension';

type ErrorCode = `${DropzoneErrorCode}`;

type FileError = {
  type?: ErrorCode;
  errors: Array<{ name?: string; message: string }>;
};

type FileWithPreview = FileWithPath & {
  id: number;
  preview?: string;
};

type InputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'onChange' | 'onBlur'
>;
export type DropzoneProps = InputProps & {
  /** File type(s) that the Dropzone should be allowed to accept. */
  accept?: AcceptedType | AcceptedType[];
  /** Maximum number of files that the Dropzone should be allowed to accept. */
  maxFiles?: number;
  /** Maximum file size that the Dropzone should be allowed to accept. Value should be provided in kB */
  maxFileSizeKb?: number;
  /** Minimum file size that the Dropzone should be allowed to accept. Value should be provided in kB */
  minFileSizeKb?: number;
  /** When true, renders an image preview next to file previews. */
  showImageThumbnails?: boolean;
};

export const Dropzone = forwardRef<HTMLInputElement, DropzoneProps>(
  (
    {
      accept,
      maxFiles = 1,
      maxFileSizeKb,
      minFileSizeKb,
      name,
      onBlur,
      onChange,
      showImageThumbnails,
    },
    forwardedRef
  ) => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [fileError, setFileError] = useState<FileError>();

    const handleRemoveFile = (id: number) => {
      setFiles((previousFiles: FileWithPreview[]) =>
        previousFiles.filter(existingFile => existingFile.id !== id)
      );
    };

    const handleDropAccepted = (acceptedFiles: FileWithPath[]) => {
      const acceptedFilesWithPreview = acceptedFiles.map(
        (acceptedFile, index) => ({
          ...acceptedFile,
          id: files.length === 0 ? index + 1 : files.length + index + 1,
          preview: acceptedFile.type.startsWith('image')
            ? URL.createObjectURL(acceptedFile)
            : undefined,
        })
      );
      setFiles(prevFiles => [...prevFiles, ...acceptedFilesWithPreview]);
    };

    const [{ disabled, invalid }, a11yProps] = useFieldContext();

    const {
      fileRejections,
      getInputProps,
      getRootProps,
      isDragActive,
      isDragReject,
      inputRef: dropzoneInputRef,
    } = useDropzone({
      accept,
      maxFiles,
      maxSize: maxFileSizeKb && maxFileSizeKb * 1000,
      minSize: minFileSizeKb && minFileSizeKb * 1000,
      multiple: maxFiles > 1,
      onDropAccepted: handleDropAccepted,
      disabled,
    });

    const {
      // We are using an _actual_ button, so we don't need these props
      role: _unusedRole,
      tabIndex: _unusedTabIndex,

      ...dropzoneProps
    } = getRootProps();

    const {
      // We don't want input to be `display: none` as we are using `VisuallyHidden`
      style: _unusedStyleProps,

      ...dropzoneInputProps
    } = getInputProps();

    // HACK: Runs the `onChange` and `onBlur` functions and swaps in our local state whenever `files` is updated.
    useEffect(() => {
      onChange?.({ target: { value: files, name }, type: 'change' } as any);
      onBlur?.({ target: { value: files, name }, type: 'blur' } as any);
    }, [files, name, onBlur, onChange]);

    useEffect(() => {
      if (!fileRejections.length) {
        setFileError(undefined);
        return;
      }
      const errorMessage: FileError = { errors: [] };

      if (fileRejections.length > maxFiles) {
        errorMessage.type = 'too-many-files';
        errorMessage.errors = [
          {
            message:
              'We can’t upload anymore files as there’s too many files. ' +
              `The maximum number of files is ${maxFiles}. ` +
              'Please remove a file before trying again.',
          },
        ];
      } else {
        fileRejections.map(({ errors, file: { name } }) => {
          errors.forEach(error => {
            let message = 'unknown validation error.';

            switch (error.code as ErrorCode) {
              case 'file-too-large':
                message = `is too large. Max supported file size is ${formatFileSize(
                  maxFileSizeKb || Infinity
                )}.`;
                break;
              case 'file-too-small':
                message = `is too small. Min supported file size is ${formatFileSize(
                  minFileSizeKb || 0
                )}.`;
                break;
              case 'file-invalid-type':
                message = `is not a supported file type. Supported file types are ${
                  Array.isArray(accept)
                    ? accept.map(f => mimeTypeToFileExtension[f]).join(', ')
                    : mimeTypeToFileExtension[accept!]
                }.`;
                break;
            }
            errorMessage.errors.push({ name, message });
          });
        });
      }

      setFileError(errorMessage);
    }, [accept, fileRejections, maxFileSizeKb, maxFiles, minFileSizeKb]);

    const isInvalid = invalid || isDragReject;
    const theme = useTheme();
    const focusRingStyles = useFocusRing();
    const dropzoneStyles = useDropzoneStyles({ disabled, isInvalid });

    return (
      <Stack gap="large">
        <VisuallyHidden
          as="input"
          disabled={disabled}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          {...a11yProps}
          {...dropzoneInputProps}
          // We need to forward the ref to the input so that libraries like `react-hook-form` will work.
          // but `react-dropzone` also needs a ref, so we need to merge them.
          ref={mergeRefs([forwardedRef, dropzoneInputRef])}
        />
        <Stack
          {...dropzoneProps}
          as="button"
          align="center"
          background={(() => {
            if (disabled) return 'inputDisabled';
            if (isInvalid) return 'criticalLight';
            return 'surfaceMuted';
          })()}
          border={(() => {
            if (disabled) return 'fieldDisabled';
            if (isInvalid) return 'critical';
            return 'field';
          })()}
          borderRadius="medium"
          borderWidth="large"
          gap="large"
          padding="large"
          position="relative"
          className={css(dropzoneStyles)}
        >
          {isDragActive && (
            <Box
              // Position absolute so height never changes
              position="absolute"
              top={0}
              bottom={0}
              display="flex"
              alignItems="center"
            >
              <Text tone={isDragReject ? 'critical' : 'neutral'}>
                {isDragReject ? 'file type not valid' : 'drop files to upload'}
              </Text>
            </Box>
          )}
          <Stack
            // Hide from screen-readers and visually, but keep it in the document flow so height doesn't change
            aria-hidden={isDragActive}
            align="center"
            gap="large"
            position="relative"
            className={css(
              isDragActive
                ? {
                    opacity: 0,
                    pointerEvents: 'none',
                  }
                : null
            )}
          >
            <UploadIcon
              size="medium"
              tone={disabled ? 'disabled' : 'neutral'}
            />

            <Text align="center" tone={disabled ? 'disabled' : 'neutral'}>
              click to select files <br />
              or drop files here
            </Text>
          </Stack>
        </Stack>
        {fileError && (
          <Alert
            tone="critical"
            heading={
              fileError.type === 'too-many-files'
                ? 'Maximum number of files reached'
                : 'These files couldn’t be added:'
            }
            onClose={() => setFileError(undefined)}
          >
            {fileError.type === 'too-many-files' ? (
              <Text>{fileError.errors[0]?.message}</Text>
            ) : (
              <TextList gap="medium">
                {fileError.errors.map(error => (
                  <Text weight="regular" key={error.name}>
                    {error.name} - {error.message}
                  </Text>
                ))}
              </TextList>
            )}
          </Alert>
        )}
        {files.length > 0 && (
          <Stack as="ul" role="list" gap="medium">
            {files.map(file => (
              <Box
                key={file.id}
                as="li"
                border="field"
                borderRadius="small"
                padding="xsmall"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap="medium"
                  height="medium"
                  paddingLeft="small"
                >
                  {showImageThumbnails && file.preview ? (
                    <Box
                      as="img"
                      height="xsmall"
                      width="xsmall"
                      src={file.preview}
                      className={css({ objectFit: 'cover' })}
                      alt=""
                    />
                  ) : (
                    <DocumentTextIcon size="xsmall" />
                  )}
                  <Box flex={1}>
                    <Text inline>{file.path}</Text>
                  </Box>
                  <Box
                    as="button"
                    type="button"
                    onClick={() => handleRemoveFile(file.id)}
                    cursor="pointer"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="small"
                    height="medium"
                    width="medium"
                    className={css({
                      transitionProperty: 'all',
                      transitionTimingFunction: theme.animation.standard.easing,
                      transitionDuration: `${theme.animation.standard.duration}ms`,
                      ':hover': {
                        backgroundColor: theme.color.background.surfaceMuted,
                      },
                      ':focus': focusRingStyles,
                    })}
                  >
                    <VisuallyHidden>Remove file</VisuallyHidden>
                    <XIcon size="xxsmall" />
                  </Box>
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    );
  }
);

Dropzone.displayName = 'FileUpload';

function useDropzoneStyles({
  disabled,
  isInvalid,
}: {
  disabled: boolean;
  isInvalid: boolean;
}) {
  const theme = useTheme();
  const focusRingStyles = useFocusRing();
  return {
    borderStyle: 'dashed',
    cursor: disabled ? 'default' : 'pointer',
    transitionProperty: 'all',
    transitionTimingFunction: theme.animation.standard.easing,
    transitionDuration: `${theme.animation.standard.duration}ms`,
    ':hover': {
      backgroundColor:
        disabled || isInvalid ? undefined : theme.color.background.infoLight,
      borderColor:
        disabled || isInvalid ? undefined : theme.border.color.fieldHover,
    },
    ':focus': focusRingStyles,
  };
}

function formatFileSize(numKb: number): string {
  if (numKb < 1000) {
    return `${Math.round(numKb).toFixed()}kB`;
  }
  return `${Math.round(numKb / 1000).toFixed()}MB`;
}
