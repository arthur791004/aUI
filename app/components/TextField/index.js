import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { timingFunctions } from 'polished';

const TextFieldWrapper = styled.div`
  position: relative;
  font-size: 16px;
  line-height: 24px;
  width: 300px;
  height: 66px;
`;

const Label = styled.label`
  position: absolute;
  line-height: 24px;
  top: 20px;
  z-index: 1;
  transform:
    scale(${props => (props.isFocused ? 0.75: 1)})
    translate(0px, ${props => (props.isFocused ? -26 : 0)}px);
  transform-origin: left top 0px;
  pointer-events: none;
  user-select: none;
  transition: all 0.45s ${timingFunctions('easeOutQuint')};
  color: ${props => (props.isFocused ? '#28232D' : '#A9A4B0')};
`;

const Input = styled.input`
  position: relative;
  top: 20px;
  padding: 0px;
  width: 100%;
  border: none;
  outline: none;
  color: #28232D;
  box-sizing: border-box;
  appearance: textfield;
`;

const UnderlineInactive = styled.div`
  position: absolute;
  border-bottom: 1px solid #D2D2D7;
  bottom: 21px;
  box-sizing: content-box;
  margin: 0px auto;
  width: 100%;
`;

const UnderlineActive = UnderlineInactive.extend`
  border-bottom: 1px solid #28232D;
  left: 0;
  right: 0;
  width: ${props => (props.isFocused ? '100%' : 0)};
  transition: width 0.5s ${timingFunctions('easeOutQuint')};
`;

class TextField extends PureComponent {
  state = {
    isFocused: false,
  }

  onFocus = () => {
    this.setState({ isFocused: true });
  }

  onBlur = () => {
    this.setState({ isFocused: false });
  }

  render() {
    const { label } = this.props;
    const { isFocused } = this.state;

    return (
      <TextFieldWrapper>
        <Label isFocused={isFocused}>
          {label}
        </Label>
        <Input
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        <UnderlineInactive />
        <UnderlineActive isFocused={isFocused} />
      </TextFieldWrapper>
    );
  }
}

export default TextField;
