import styled, { keyframes } from 'styled-components';

export default function TextAnimation() {

    const reactArray = "Missing  Cats  Göteborg".split("")

    return <Wrapper className='headline'>{reactArray.map((item, index) =>(
        <span key={index}>{item}</span>
    ))}</Wrapper>
}

const animation = keyframes`
    0% { opacity: 0; transform: translateY(-100px); skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px); }
    25% { opacity: 1;  transform: translateY(0px); skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px); }
    75% { opacity: 1;  transform: translateY(0px); skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px); }
    100% { opacity: 1;  transform: translateY(0px); skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px); }
 
`
const Wrapper = styled.span`
display: inline-block;
span {
    opacity: 0;
    display: inline-block;
    animation-name: ${animation};
    animation-duration: 7s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  
}

span:nth-child(1) {
    animation-delay: 0.1s;
}
span:nth-child(2) {
    animation-delay: 0.2s;
}
span:nth-child(3) {
    animation-delay: 0.3s;
}
span:nth-child(4) {
    animation-delay: 0.4s;
}
span:nth-child(5) {
    animation-delay: 0.5s;
}
span:nth-child(6) {
    animation-delay: 0.6s;
}
span:nth-child(7) {
    animation-delay: 0.7s;
}
span:nth-child(8) {
    animation-delay: 0.8s;
}
span:nth-child(9) {
    animation-delay: 0.9s;
}
span:nth-child(10) {
    animation-delay: 1s;
}
span:nth-child(11) {
    animation-delay: 1.1s;
}
span:nth-child(12) {
    animation-delay: 1.2s;
}
span:nth-child(13) {
    animation-delay: 1.3s;
}
span:nth-child(14) {
    animation-delay: 1.4s;
}
span:nth-child(15) {
    animation-delay: 1.5s;
}
span:nth-child(16) {
    animation-delay: 1.6s;
}
span:nth-child(17) {
    animation-delay: 1.7s;
}
span:nth-child(18) {
    animation-delay: 1.8s;
}
span:nth-child(19) {
    animation-delay: 1.9s;
}
span:nth-child(20) {
    animation-delay: 1.9s;
}
span:nth-child(21) {
    animation-delay: 2s;
}
span:nth-child(22) {
    animation-delay: 2.1s;
}
span:nth-child(23) {
    animation-delay: 2.2s;
}

`
