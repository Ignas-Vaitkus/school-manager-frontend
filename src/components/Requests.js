import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import CustomTable from "./CustomTable";

const columns = [
  { id: "code", label: "Personal code" },
  { id: "first_name", label: "First Name", minWidth: 100 },
  { id: "last_name", label: "Last Name", minWidth: 100 },
  { id: "grade", label: "Address" },
  { id: "parent_id", label: "Parent ID" },
  { id: "school_id", label: "School ID" },
  { id: "approved", label: "Status" },
];

const Requests = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const url = "http://127.0.0.1:8000/api/pupil";
  const auth = useContext(AuthContext);
  const hs = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.getToken()}`,
  };

  useEffect(() => {
    if (!auth.getToken()) navigate("/login");

    if (auth.getRole() == "1") {
      fetch("http://127.0.0.1:8000/api/pupil/")
        .then((res) => res.json())
        .then(
          (res) => {
            setItems(res);
            setIsLoaded(true);
          },
          (err) => {
            setError(err);
            setIsLoaded(true);
          }
        );
    } else {
      fetch("http://127.0.0.1:8000/api/pupil/unapproved/" + auth.getUserId)
        .then((res) => res.json())
        .then(
          (res) => {
            setItems(res);
            setIsLoaded(true);
          },
          (err) => {
            setError(err);
            setIsLoaded(true);
          }
        );
    }
  }, []);

  const deleteItem = (id) => {
    fetch(url + "/" + id, {
      method: "DELETE",
      headers: hs,
    }).then(
      (res) => {
        if (res.status === 200) {
          const remaining = items.filter((p) => id !== p.id);
          setItems(remaining);
        } else if (res.status === 401) {
          setError({ message: res.statusText });
        }
      },
      (err) => {
        console.log(err);
        setError(err);
        setIsLoaded(true);
      }
    );
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <CustomTable
        {...{
          columns: columns,
          rows: items,
          component: "requests",
        }}
      />
    );
  }
};

export default Requests;
