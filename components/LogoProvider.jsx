import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';

const LogoProvider = ({name}) => {
  if(name === "Google") {
    return (
        <span>< FcGoogle /></span>
    )
  } else if(name === 'Github') {
    return (
        <span> <BsGithub /></span>
    )
  }
  else {
    return (
        <span></span>
    )
  }
}

export default LogoProvider