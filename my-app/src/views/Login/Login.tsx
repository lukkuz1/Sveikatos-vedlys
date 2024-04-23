import React, { useState, useEffect } from 'react';
import Colors from '../../lib/Colors/Colors';
import EntryButton from '../../div-components/EntryButton';
import EntryInputField from '../../div-components/EntryInputField';
import { NavLink } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    // Your side effect code here if needed
  }, []); // Empty dependency array to run effect only once

  const handleSignIn = async () => {
    // Your sign-up logic here
  };



  return (
    <div style={styles.container}>
        <h1 >Login</h1>
        <EntryInputField
          headerText=""
          placeholderText="Enter Your Email"
          isPassword={false}
          margin={[0, 10, 0, 0]}
          onChangeText={(text) => setEmail(text)}
        />
        <EntryInputField
          headerText=""
          placeholderText="Enter Your Password"
          isPassword={true}
          margin={[0, 10, 0, 0]}
          onChangeText={(text) => setPassword(text)}
        />
        <EntryButton
          text="Sign In"
          textColor={Colors.White}
          buttonColor={Colors.LightBlue}
          margin={[20, 20, 0, 0]}
          onPress={handleSignIn}
        />
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  label: {
    marginBottom: 20,
    color: Colors.EntryLighterWhite,
    fontSize: 24,
    fontWeight: "700",
  },
  separatorText: {
    color: Colors.Black,
    fontSize: 18,
    fontWeight: "400",
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  }
};