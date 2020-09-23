import styled from 'styled-components'

export const TopRightOrange = styled.p`
position: absolute;
    top: 0;
    right: 0;
    font-size: 12px;
    background-color: #e2a535;
    color: white;
    box-sizing: border-box;
    padding: 3px;
    border-bottom-left-radius: 5px;
    // border-radius: inherit;
`

export const ImgContainer = styled.div`
height: 200px;
width: 200px;
border-radius: 10px;
margin: 5px;
position: relative;
`

export const TopRightCross = styled.div`
position: absolute;
top: 0;
right: 0;
background-color: darkred;
padding: 5px 10px;
color: white;
border-top-right-radius: inherit;
cursor: pointer;
transition: 0.5s all;

&:hover{
    background-color: black;
  }
`