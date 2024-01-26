import styled from 'styled-components';
export const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  &:hover {
    cursor: pointer;
  }
  /* width: 100vw;  //розтягуємо модалку на ширину та висоту екрана
  height: 100vh; */
  .modal {
    max-width: 450px;
    width: 100%;
    min-height: 450px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    &:hover {
      cursor: auto;
    }
  }

  .btnClose {
    position: absolute;
    top: 15px;
    right: 15px;
  }
`;
