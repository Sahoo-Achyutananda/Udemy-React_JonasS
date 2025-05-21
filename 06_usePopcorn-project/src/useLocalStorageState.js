import { useState, useEffect } from "react";

// This is very specific to our app, we need to generalize it to store any kind of data we want
// export default function useLocalStorageState() {
//   const [watched, setWatched] = useState(function () {
//     return JSON.parse(localStorage.getItem("watched")) || [];
//   });
//   useEffect(
//     function () {
//       localStorage.setItem("watched", JSON.stringify(watched));
//     },
//     [watched]
//   ); // every time the watched array is updated - the local Memory is updated

//   return [watched, setWatched];
// }

export default function useLocalStorageState(keyName) {
  const [data, setData] = useState(function () {
    return JSON.parse(localStorage.getItem(keyName)) || [];
  });

  useEffect(
    function () {
      localStorage.setItem(keyName, JSON.stringify(data));
    },
    [data, keyName]
  ); // every time the watched array is updated - the local Memory is updated

  return [data, setData];
}
