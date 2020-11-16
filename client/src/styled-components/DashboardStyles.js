import styled from "styled-components";

export const DashboardContainer = styled.div`
width:100%;
height:100vh;
`

export const CourseCardContainer = styled.div`
    width: 150px;
    height: 150px;
    margin-bottom:10px;
    border-radius:95px;
    background:white;
    padding: 15px;
`

export const CardsContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    flex-wrap:wrap;
`

export const Hamburger = styled.div`
    display:flex;
    flex-direction:column;
    width: 50px;
    height: 50px;
    position:fixed;
    justify-content:center;
    align-items:center;
    top:0;
    .burger {
        height: 3px;
        background-color:black;
        width: 30px;
        margin-top:7px;
    }
`

export const TopBarContent = styled.div`
  position:absolute;
  right: 25px;
  top: 50px;
  background-color:white;
`