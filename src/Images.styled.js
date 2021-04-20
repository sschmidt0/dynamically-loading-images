import styled from 'styled-components';

export const ImageGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  list-style-type: none;

  @media only screen and (min-width: 768px) {
		justify-content: start;
	}

  li {
    position: relative;
    margin-bottom: 20px;

    @media only screen and (min-width: 768px) {
      margin: 20px;
	  }

    &:hover {
      div {
        display: flex;
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
  }

  div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: none;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
`;
