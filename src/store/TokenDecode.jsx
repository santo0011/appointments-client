

// export const decodeJwt = (token) => {
//     const [header, payload, signature] = token.split('.');
//     const decodedHeader = JSON.parse(atob(header));
//     const decodedPayload = JSON.parse(atob(payload));

//     return {
//         header: decodedHeader,
//         payload: decodedPayload,
//         signature: signature,
//     };
// };


    // const [dToken, setDToken] = useState({});
    // const { name, email, isDoctor, isAdmin } = dToken;

    // useEffect(() => {
    //     if (userInfo) {
    //         const decodedToken = decodeJwt(userInfo);
    //         setDToken({
    //             name: decodedToken.payload.name,
    //             email: decodedToken.payload.email,
    //             isDoctor: decodedToken.payload.isDoctor,
    //             isAdmin: decodedToken.payload.isAdmin
    //         })
    //     }
    // }, []);
