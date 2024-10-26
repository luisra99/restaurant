import appConfig from "@/app/app-config.json";
import isMobile from "@/utils/is-mobile";
const mode: boolean = import.meta.env.ENV_MODE === "dev" ? true : false;
const apiScope = mode ? `/api/gw-dev/` : `/api/gw/`;

const email = appConfig.email;
const title = appConfig.title;
const logInRedirectPath = appConfig.loginRedirectPath;
const selfSignUp = appConfig.selfSignUp;
const localSignIn = appConfig.localSignIn;
const logOutRedirectPath = appConfig.logOutRedirectPath;

const messages = {
  app: {
    crash: {
      title: appConfig.crashTitle,
      options: {
        email: `${appConfig.crashMessage}${email}`,
        reset: appConfig.crashReset,
      },
    },
  },
  loader: {
    fail: "Hmmmmm, algo fue mal con la carga de este componente... Quizás sea una buena idea intentarlo mas tarde",
  },
  images: {
    failed: "algo fue mal mientras se cargaba esta imagen :(",
  },
  404: "Amigo? Que estas buscando?",
};
const defaultMetaTags = {
  image: "/cover.png",
  description: "Starter kit for modern web applications",
};
const notifications: any = {
  options: {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    autoHideDuration: 5000,
  },
  maxSnack: isMobile ? 3 : 4,
};

const loader = {
  // no more blinking in your app
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

export {
  email,
  selfSignUp,
  localSignIn,
  title,
  apiScope,
  mode,
  messages,
  notifications,
  defaultMetaTags,
  loader,
  logInRedirectPath,
  logOutRedirectPath,
};
