import { createIcon } from '@spark-web/icon';

export const Logo: React.FC<
  JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
> = props => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 346 100"
      fill="currentColor"
      {...props}
    >
      <path d="M166.583 13.839a8.857 8.857 0 00-5.253 1.097 8.9 8.9 0 00-1.918 14.03 8.86 8.86 0 0014.002-1.93 8.899 8.899 0 00-1.462-10.64 8.867 8.867 0 00-5.369-2.557z" />
      <path
        fillRule="evenodd"
        d="M111.52 44.362c5.004-2.763 7.894-7.309 7.894-13.698 0-9.144-6.327-16.047-18.576-16.047h-26.23v61.777h25.998c7.399 0 12.969-1.603 16.542-4.831 3.37-3.066 4.917-7.628 4.917-12.844-.017-6.94-3.73-12.235-10.545-14.357zM89.457 27.375h7.932c4.239 0 6.939 2.39 6.939 6.19 0 3.8-2.316 6.53-7.857 6.53h-7.014v-12.72zm8.23 36.357h-8.23v-12.72h8.135c4.722 0 7.489 2.581 7.489 6.576 0 3.472-2.316 6.14-7.394 6.14v.004z"
        clipRule="evenodd"
      />
      <path d="M134.894 35.755a10.956 10.956 0 013.341 7.559c1.55-7.268 5.715-10.396 11.289-10.396 4.243 0 5.302.642 5.302.642v13.702s-1.634-.708-4.818-.708c-2.8 0-5.302.903-6.91 3.348-.906 1.38-1.514 3.368-1.514 6.07V76.41h-14.271V54.716c-.054-3.513-.786-5.651-1.857-7.334a11.507 11.507 0 00-4.512-3.915l6.286-10.773a10.91 10.91 0 017.664 3.061zm37.921 40.635h-14.267V37.816l14.267-4.123V76.39z" />
      <path
        fillRule="evenodd"
        d="M207.336 69.96h-12.969c-2.171 0-3.415-.61-3.415-2.395a2.401 2.401 0 01.562-1.579c1.993.389 4.02.579 6.05.568 13.233 0 19.598-6.696 19.598-16.391a17.706 17.706 0 00-2.858-9.973 8.072 8.072 0 012.37-.332h3.445V27.814s-1.146-.046-4.31-.046c-5.491 0-8.055 2.805-9.271 6.385a24.771 24.771 0 00-8.974-1.533c-13.647 0-19.602 7.872-19.602 17.56 0 4.971 1.762 9.164 5.223 12.06-2.952 1.894-4.875 4.687-4.875 8.217 0 5.548 3.552 8.32 7.77 9.563l-9.606 2.784a11.714 11.714 0 00-.827 3.729c0 7.827 7.114 13.467 21.513 13.467 18.125 0 24.898-7.634 24.898-16.265-.008-9.364-5.86-13.775-14.722-13.775zm-9.772-26.058c4.21 0 6.307 2.801 6.307 6.26 0 3.46-2.068 6.257-6.307 6.257-4.168 0-6.311-2.8-6.311-6.256 0-3.456 1.911-6.244 6.311-6.244v-.017zm.19 44.035c-6.616 0-9.176-1.723-9.176-4.379a4.382 4.382 0 011.104-2.93h.051a7.353 7.353 0 01.229.006l.257.011h.003c.176.009.353.017.527.017l14.035.054c2.316 0 3.511 1.264 3.511 2.942 0 2.846-3.924 4.296-10.541 4.296v-.016z"
        clipRule="evenodd"
      />
      <path d="M263.892 60.181v-12.74c0-7.342-3.92-14.502-13.564-14.502-6.166 0-10.099 2.98-12.336 7.247v-25.39l-14.267 4.085v57.592h14.267V55.408c0-2.486.31-4.238 1.241-5.904a5.823 5.823 0 015.334-3.09c3.598 0 5.078 2.643 5.078 6.442v10.942c0 3.928.319 7.02 2.13 9.46 1.907 2.564 5.409 4.143 10.289 4.143 5.496 0 8.854-1.388 8.854-1.388V63.169c-1.118.32-2.274.49-3.437.501-2.431-.017-3.589-1.127-3.589-3.489zm28.348 3.262c-2.51 0-3.858-1.094-3.858-4.057V44.284h11.732V33.37h-11.732V19.78l-14.272 3.477V33.37h-6.451v10.914h6.451v16.648c0 5.41.902 8.51 2.829 11.013 2.605 3.38 6.174 4.972 12.15 4.972 8.291 0 14.846-4.123 14.846-4.123l-6.361-10.884s-2.667 1.533-5.334 1.533z" />
      <path
        fillRule="evenodd"
        d="M325.856 64.797a11.34 11.34 0 01-6.724-2.021l25.966-10.922c0-7.989-6.588-19.888-21.409-19.888-13.233 0-22.244 9.21-22.244 22.216 0 15.136 10.992 23.203 23.845 23.203 11.062 0 17.616-5.701 17.616-5.701l-6.381-10.26s-4.755 3.373-10.669 3.373zm-11.124-11.302c0-5.602 3.858-9.373 8.581-9.373 3.957 0 5.731 2.341 6.48 3.924l-15.028 6.335a12.412 12.412 0 01-.032-.746l-.001-.14z"
        clipRule="evenodd"
      />
      <path d="M49.365 43.027S51.42 42 55.661 41.322c2.113-.374 3.975-.56 6.121-.553V14.675c-7.522.034-14.783 1.33-21.86 3.834l9.444 24.518zm-8.621 4.887s-2.771 2.258-4.182 3.689c-1.27 1.273-3.813 4.612-3.813 4.612L9.668 42.295a58.801 58.801 0 0115.536-16.158l15.54 21.777zM26.772 75.268a40.31 40.31 0 011.965-10.643c.212-.624.36-1.106.36-1.106L3.005 56.482A64.398 64.398 0 000 76.129v.28h26.725s.013-.513.047-1.141zm35.01-10.136V50.168c-15.523.316-25.635 10.976-25.635 25.961v.28h14.979c.006-.067.005-.132.004-.196v-.065c0-6.515 3.812-10.755 10.652-11.016z" />
    </svg>
  );
};

export const StorybookLogo = createIcon(
  <>
    <path
      fill="#ff4785"
      stroke="none"
      d="M.848 22.068L.001 2.3c-.028-.653.544-1.206 1.289-1.247L20.496.003c.758-.042 1.41.462 1.458 1.126l.003.075v21.541c0 .665-.616 1.204-1.376 1.204l-.061-.001-18.359-.722c-.715-.028-1.286-.532-1.313-1.158z"
    />
    <path
      fill="#fff"
      stroke="none"
      d="M16.213 2.944L16.345.18 18.982 0l.114 2.849c.004.099-.085.182-.198.185a.225.225 0 01-.134-.038l-1.017-.701-1.205.8a.225.225 0 01-.287-.035.165.165 0 01-.042-.116zM12.84 9.027c0 .468 3.605.244 4.088-.085 0-3.19-1.955-4.867-5.535-4.867S5.806 5.778 5.806 8.331c0 4.448 6.856 4.533 6.856 6.959 0 .68-.38 1.085-1.218 1.085-1.092 0-1.524-.488-1.473-2.148 0-.36-4.165-.472-4.292 0-.323 4.023 2.54 5.183 5.815 5.183 3.175 0 5.663-1.481 5.663-4.163 0-4.766-6.958-4.639-6.958-7 0-.959.813-1.086 1.295-1.086.508 0 1.422.078 1.346 1.866z"
    />
  </>,
  'StorybookLogo'
);
