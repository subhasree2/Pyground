import axios from "axios";
import { useState } from "react";
console.log(process.env);

function Navbar({ setOutput, input, code }) {
    const [label,setlabel] = useState("Run Code");

    const Submit = async () => {
        setlabel("Running");
        const options = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {
                base64_encoded: 'true',
                fields: '*'
            },
            headers: {
                'content-type': 'application/json',
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': process.env.API_HOST
            },
            data: {
                language_id: 71,
                source_code: btoa(code),
                stdin: btoa(input)
            }
        };

        try {
            const response = await axios.request(options);
            setlabel("Run Code")
            Status(response.data.token);
        } catch (err) {
            let error = err;
            console.error(error);
        }
    }

    const Status = async (token) => {
        const options = {
            method: 'GET',
            url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
            params: {
                base64_encoded: 'true',
                fields: '*'
            },
            headers: {
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': process.env.API_HOST
            }
        };

        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            if(statusId === 1 || statusId === 2) {
                Status(token);
                return;
            }
            else {
                setOutput(response.data);
                return;
            }
        }
        catch(err) {
            console.error(err);
        }
    }

    return (
        <div className="navbar">
            <span className="font-serif text-2xl">PyGround</span>
            {label==="Run Code" &&  <button className="ml-10 text-1xl p-2 pl-4 pr-4 bg-green-500" onClick={() => Submit()}>{label}</button>}
            {label==="Running" && <button className="ml-10 text-1xl p-2 pl-4 pr-4 bg-blue-500" onClick={() => Submit()}>{label}</button> }
        </div>
    )
}

export default Navbar;