"use client";
import React from "react";
import { TextField, Button, InputLabel } from "@mui/material";
import { useUser } from "@/contextApi/UserContext";
const AccountForm = () => {
  const { user, setUser } = useUser();

  const handleForm = (e) => {
    let { name, email, phone, img } = e.target.value;
    console.log(e.target.value);
  };
  return (
    <form onSubmit={handleForm}>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div>
          <div className="flex flex-col ">
            <InputLabel
              shrink
              className="uppercase text-black text-[16px] font-semibold "
            >
              Name
            </InputLabel>
            <TextField
              value={user.name}
              type="text"
              onChange={handleForm}
              fullWidth
              className="mb-4"
            />
          </div>{" "}
          <div className="flex flex-col ">
            <InputLabel
              shrink
              className="uppercase text-black text-[16px] font-semibold "
            >
              Email
            </InputLabel>
            <TextField
              value={user.email}
              type="email"
              onChange={handleForm}
              fullWidth
              className="mb-4"
            />
          </div>
          <div className="flex flex-col ">
            <InputLabel
              shrink
              className="uppercase text-black text-[16px] font-semibold "
            >
              Phone Number
            </InputLabel>
            <TextField
              value={user.phone}
              type="number"
              onChange={handleForm}
              fullWidth
              className="mb-4"
            />
          </div>{" "}
        </div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default AccountForm;
