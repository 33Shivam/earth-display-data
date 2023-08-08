import React, { Suspense } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import Landing from "./landing";

const Section = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: black;
`;
const Container = styled.div`
  width: 1400px;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  width: 1400px;
  /* background-color: aliceblue; */
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  /* background-color: red;   */
`;

const Right = styled.div`
  flex: 3;
  justify-content: center;
  position: relative;
  /* background-color: yellow; */
`;

const Hello = styled.h1`
  font-size: 74px;
  white-space: nowrap;
  font-weight: 800;
  font-family: "Century Gothic";
  margin: 0;
`;

const Title = styled.h2`
flex: 1;
align-items: flex-start;
cursor: default;
justify-content: center;
  font-size: 64px;
  white-space: nowrap;
  display: flex;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  gap: 10px;
  margin: 0;
  font-family:"Calibri" ;
  color: black;
  -webkit-text-stroke: 1px white;
  transition: color 700ms;

  &:hover {
    color: aliceblue;
  }

  
`;
const Desc = styled.div`
flex: 5;
display: flex;
justify-content: center;
align-items: center;
  font-size: 20px;
  font-family:"Calibri" ;
  font-weight: 100;
  line-height: 1.75;
  color: #ffffff;
  
`;

const Button = styled.button`
  width: 150px;
  background-color: #17e1a4;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: "Century Gothic", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    background-color: #055c36;
  }
`;

const Homepage = () => {
  return (
    <Section id="home">
      <Container>
        <Left>
            <Title>PLAY . CONSERVE</Title>
            <Desc>This Demo is created by 33Shivam for ZuraVerse. <br/>
            This is a 3D model of a map of the world. <br/>
            The map is created using React-Three-Fiber and Three.js. <br/>

            </Desc>
        </Left>
        <Right id="model_container">
          <Landing />
        </Right>
      </Container>
    </Section>
  );
};

export default Homepage;
