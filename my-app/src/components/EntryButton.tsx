import React, { ReactNode } from 'react';
type Props = {
  text: string;
  textColor: string;
  buttonColor: string;
  margin?: [number, number, number, number];
  onPress?: () => Promise<void>;
};
export default function EntryButton({ text, textColor, buttonColor, margin = [0, 0, 0, 0], onPress }: Props) {


  return (
    <button
      style={{
        width: 310,
        height: 50,
        flexShrink: 0,
        borderRadius: 10,
        backgroundColor: buttonColor,
        marginTop: margin[0],
        marginBottom: margin[1],
        marginLeft: margin[2],
        marginRight: margin[3],
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
      onClick={() => onPress}
    >
      <div style={{ position: 'absolute', left: 13 }}></div>
      <p style={{ fontSize: 16, fontWeight: '600', textAlign: 'center', color: textColor }}>{text}</p>
    </button>
  );
}