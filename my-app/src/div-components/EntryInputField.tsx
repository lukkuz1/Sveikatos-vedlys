import React from 'react';
import { useState } from 'react';

type Props = {
  headerText: string;
  placeholderText: string;
  isPassword: boolean;
  margin?: [number, number, number, number];
  onChangeText: (text: string) => void;
};

export default function EntryInputField({ headerText, placeholderText, isPassword, margin = [0, 0, 0, 0], onChangeText }: Props) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChangeText(event.target.value);
  };

  return (
    <div
      style={{
        marginTop: margin[0],
        marginBottom: margin[1],
        marginLeft: margin[2],
        marginRight: margin[3],
      }}
    >
      <p style={styles.typeFont}>{headerText}</p>
      <div style={styles.rectangle}>
        <input
          type={isPassword ? 'password' : 'text'}
          placeholder={placeholderText}
          style={styles.insideFont}
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

const styles = {
  typeFont: {
    paddingBottom: 5,
    paddingLeft: 3,
    fontSize: 14,
    fontWeight: "400",
  },
  insideFont: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    fontSize: 16,
    fontWeight: "400",
    width: '100%',
    height: '100%',
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
  },
  rectangle: {
    width: 310,
    height: 50,
    flexShrink: 0,
    borderRadius: 18,
    borderWidth: 1.35,
    borderStyle: 'solid',
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
  },
};
