import React, { useState } from "react";
import { authService } from "fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    console.log(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = "";
    try {
      if (newAccount) {
        // create new account
        data = await createUserWithEmailAndPassword(authService, email, password);
      } else {
        // log in
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form>
        <input name="email" type="email" placeholder="Email" onChange={onChange} value={email} required />
        <input name="password" type="password" placeholder="Password" onChange={onChange} value={password} required />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} onClick={onSubmit} />
      </form>
      <div>
        <button>Continue with Google</button>
      </div>
    </div>
  );
};
export default Auth;
