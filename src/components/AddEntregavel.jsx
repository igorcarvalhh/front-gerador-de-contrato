import { styled } from "styled-components";

export const AddEntregavel = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    border-radius: 100%;
  }

  &:hover {
    color: #0a58ca;
    cursor: pointer;

    div {
      background-color: #0a58ca;
      color: #fff;
    }
  }
`;
