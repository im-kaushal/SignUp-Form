/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, {useEffect, useState} from 'react';
 import {
   Button,
   StyleSheet,
   Text,
   TextInput,
   View,
   ActivityIndicator,
   Alert,
 } 
 from 'react-native';
 import axios from 'axios';
 
 const signUpTemplate = {
   name: {data: '', error: ''},
   email: {data: '', error: ''},
   password: {data: '', error: ''},
   confirmPassword: {data: '', error: ''},
   phone: {data: '', error: ''},
 };
 
 const App = () => {
   const [signUpForm, setSignUpForm] = useState({...signUpTemplate});
   const [loading, setLoading] = useState(false);
 
   const handleForm = (key: string, value: string) => {
     let currentSignUpForm: any = {...signUpForm};
 
     console.log('handleForm', key, value);
     currentSignUpForm[key].data = value;
     currentSignUpForm[key].error = handleFormError(key, value);
     setSignUpForm(currentSignUpForm);
   };
 
   const handleFormError = (key: string, value: string) => {
     let error: string = '';
     if (key == 'name') {
       if (value.length <= 2) {
         error = 'Name length must be greater than 2';
       }
     } else if (key == 'email') {
       let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
       error = regex.test(value) ? '' : 'invalid email';
     } else if (key == 'password') {
       let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
       error = value.match(passw) ? '' : 'password must contain *upper case, *lower case, *numeric';
     } else if (key == 'confirmPassword') {
       error = value == signUpForm.password.data ? '' : 'password mismatch';
     } else if (key == 'phone') {
       let phoneno = /^\d{10}$/;
       error = value.match(phoneno) ? '' : 'invalid phone number';
     }
 
     return error;
   };
 
   useEffect(() => {
     console.log('signUpForm', signUpForm);
   }, [signUpForm]);
 
   const dataExtract = () => {
     let data: any = {};
     Object.entries(signUpForm).forEach(([key, value]) => {
       data[key] = value;
     });
     delete data.confirmPassword;
     return data;
   };
 
   //backend integration
   const postData = async (data: any) => {
     try {
       const res = await axios.post('http:/localhost:3000/users', data, {
         headers: {
           'Content-Type': 'application/json',
           'x-auth-token': 'woqeqifnewoinwgiijwm',
         },
       });
       return res;
     } catch (err) {
       return err;
     }
   };
 
   const handleSubmit = async () => {
     console.log('handleSubmit', signUpForm);
     const data = dataExtract();
     console.log('signupForm-extracted-data', data);
     setLoading(true);
     try {
       const response: any = await postData(data);
       console.log('handle-submit', response);
       if (response.status == '200') {
         setLoading(false);
         Alert.alert('success', 'data added successfully');
       } else throw response;
     } catch (error: any) {
       //error handling
       setTimeout(() =>{setLoading(false);
     Alert.alert('Error', error.message);}, 2000)
     }
   };

   return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={50} color="#000" />
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Sign Up</Text>
          <TextInput
            value={signUpForm.name.data}
            onChangeText={text => handleForm('name', text)}
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={"#a6a3a2"}
          />
          <Text style={styles.errorTxt}>{signUpForm.name.error}</Text>
          <TextInput
            value={signUpForm.email.data}
            onChangeText={text => handleForm('email', text)}
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={"#a6a3a2"}
          />
          <Text style={styles.errorTxt}>{signUpForm.email.error}</Text>
          <TextInput
            value={signUpForm.password.data}
            onChangeText={text => handleForm('password', text)}
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={"#a6a3a2"}
          />
          <Text style={styles.errorTxt}>{signUpForm.password.error}</Text>
          <TextInput
            value={signUpForm.confirmPassword.data}
            onChangeText={text => handleForm('confirmPassword', text)}
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={"#a6a3a2"}
          />
          <Text style={styles.errorTxt}>
            {signUpForm.confirmPassword.error}
          </Text>
          <TextInput
            value={signUpForm.phone.data}
            onChangeText={text => handleForm('phone', text)}
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor={"#a6a3a2"}
          />
          <Text style={styles.errorTxt}>{signUpForm.phone.error}</Text>
          <View style={styles.btnContainer}>
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  formContainer: {
    width: '85%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 4,
  },
  heading: {
    fontSize: 22,
    color: '#333',
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    color: '#000',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#aaa',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
  },
  btnContainer: {
    width: 150,
    alignSelf: 'center',
    marginTop: 30,
  },
  errorTxt: {
    color: '#d00000',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default App;