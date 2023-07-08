import AboutModel from "./AboutModel";

const useAboutViewModel = ():AboutModel => {

  const texts = [];
  texts.push('Good Morning is a comfortable alarm clock.');
  texts.push('The app was created to apply my knowledge in React Native.');
  texts.push('It was coded using the MVVM design pattern.');
  texts.push('For more information about this project you can check up in github (:')

  return {
    title: 'About', 
    texts: texts, 
    urlGitHub: 'https://github.com/henriquecostadev/good_morning'
  };

}

export default useAboutViewModel ;