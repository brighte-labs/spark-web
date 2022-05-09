# Contributing to Spark Web

Contributions to Spark Web in the form of issues and PRs are welcomed

### I don't have time to read all this, where can I ask a question?

> Note: Please don't file an issue to ask a question. You'll get faster results
> by using the resources below

Brighte Staff:

- Ask the team for help in the #spark-web-support channel

Other:

- TBA

## Code contributions

Here is a quick guide to doing code contributions to the design system.

1. Clone the repository to your machine
2. Create a branch with a meaningful name for the issue:
   `git checkout -b alter-button-appearance`
3. Install packages by running `yarn in` the root of the project Make your
   changes to the necessary files
4. Once you’ve finalised your changes, add a changeset by running
   `yarn changeset`
5. Commit your code `git add` and `git commit`
6. Make sure that the tests still pass: `yarn test` and `yarn lint` (for the
   type checks)
7. Push your branch: `git push -u origin your-branch-name`
8. Submit a pull request with your branch
9. Choose a descriptive title and describe your changes briefly.
10. Wait for a maintainer to review your PR, make changes if it's being
    recommended, and get it merged.

### Version management

Spark Web uses [@changesets/cli](https://github.com/changesets/changesets) to
track package versions and publish packages. This tool allows each PR to
indicate which packages need a version bump along with a changelog snippet. This
information is then collated when performing a release to update package
versions and CHANGELOG.md files.

#### What all contributors need to do

- Make your changes (as per usual)
- Before you make a Pull Request, run the `yarn changeset` command and answer
  the questions that are asked. It will want to know:
  - Which packages you want to publish
  - What version you are releasing them at (We use [SemVer](https://semver.org/)
    for our versioning, you can read more in the below section)
  - A message to summarise the changes (this message will be written to the
    changelog of bumped packages)
- Before you accept the changeset, it will display all the data that will be
  written to the changeset. If this looks fine, agree, and a changeset will be
  generated in the .changeset directory.

After this, a new changeset will be added which is a markdown file with YAML
front matter.

    -| .changeset/
    -|-| UNIQUE_ID.md

The message you typed can be found in the markdown file. If you want to expand
on it, you can write as much markdown as you want, which will all be added to
the changelog on publish. If you want to add more packages or change the bump
types of any packages, that's also fine.

While not every changeset is going to need a huge amount of detail, a good idea
of what should be in a changeset is:

- **WHAT** the change is
- **WHY** the change was made
- **HOW** a consumer should update their code

An example, if you generate a changeset that includes auth as a patch, and core
as a minor, you can merge your PR, and the next time the version-packages
command is run, these will both be updated.

    ---
    '@keystone-6/auth': patch
    '@keystone-6/core': minor
    ---
    A very useful description of the changes should be here.

You can have multiple changesets in a single PR. This will give you more
granular changelogs, and is encouraged

#### Understanding SemVer

We’re using SemVer for Spark Web, following the same conventions as (most) other
packages on npm. This means the version tells you everything you need to know
about whether an update fixes something (without changing the public API of a
package), adds something (like a feature, or API) or breaks something in the
“usage will need to be updated” sense. There are three numbers:
major.minor.patch

- **Major** means “the API has changed in a non-backwards-compatible way”. It
  doesn’t mean your feature is broken, or fixed, better, worse, or that you’ve
  put a lot of work into the change. It just means that if somebody is using the
  package, the API has changed in a way that’s not backwards compatible.
  - There’s no wriggle room on this! Even if it’s just renaming a simple prop
    that nobody is using, technically if someone was, upgrading to the new
    version isn’t safe to do automatically and would need some effort by the
    consumer. You’ve “broken” the previous API. So it’s a Major change.
  - Since we’re working on visual components, you may also decide that a design
    change is “major” even if the public API stays the same. This is a judgement
    call, but if you’ve redesigned how buttons look, I’d call that a major
    because updating it should be reviewed by the consumer.
- **Minor** means “a feature has been added”. It doesn’t mean the feature isn’t
  a major change; just that previous usage of the component will continue to
  work the same way, but there’s something new that the package now does.
- **Patch** means you’ve fixed something. Maybe, previously, you forgot to
  actually pass the borderRadius prop down to the rendered component? fixing
  that would be a patch, because the public API hasn’t changed, and the
  component just works better now with the same (intended) set of functionality.

There’s obviously some room for nuance and judgement calls in this, but
generally: favour more significant version bumps. Consumers usually prefer to
realise that something will change (or needs to be considered than upgrading)
over being surprised.Think of the version as the easiest way to **communicate**
with consumers of your package. There’s also the change log; but the version
number tells me what I need to know. Has the API changed in a potentially
breaking way? Is there a new feature? was something just fixed? SemVer tells you
this at a glance, and keeps consuming packages safer.

### Release Guidelines

TBA
