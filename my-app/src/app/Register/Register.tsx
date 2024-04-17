import React, { useState, useEffect } from 'react';
import Colors from '../../lib/Colors/Colors';
import EntryButton from '../../components/EntryButton';
import EntryInputField from '../../components/EntryInputField';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    // Your side effect code here if needed
  }, []); // Empty dependency array to run effect only once

  const handleSignUp = async () => {
    // Your sign-up logic here
  };



  return (
    <div style={styles.container}>
        <h1>Create an account</h1>
        <EntryInputField
          headerText=""
          placeholderText="Enter Your Email"
          isPassword={false}
          margin={[0, 10, 0, 0]}
          onChangeText={(text) => setEmail(text)}
        />
        <EntryInputField
          headerText=""
          placeholderText="Enter Your Phone Number"
          isPassword={false}
          margin={[0, 10, 0, 0]}
          onChangeText={(text) => setNumber(text)}
        />
        <EntryInputField
          headerText=""
          placeholderText="Enter Your Password"
          isPassword={true}
          margin={[0, 10, 0, 0]}
          onChangeText={(text) => setPassword(text)}
        />
        <EntryButton
          text="Sign Up"
          textColor={Colors.White}
          buttonColor={Colors.LightBlue}
          margin={[20, 20, 0, 0]}
          onPress={handleSignUp}
        />

        <div style={{ height: 25, width: 310, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: Colors.EntryLighterWhite, fontSize: 14, fontWeight: "400" }}>Already have an account ?</p>
          <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => {}}>
            <p style={{ color: Colors.EntryLighterWhite, fontSize: 14, fontWeight: "600", marginLeft: 5 }}>Log in!</p>
          </button>
        </div>
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