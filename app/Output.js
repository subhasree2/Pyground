"use client";
function Output({output}) {
    const base64ToUtf8 = (b) => {
        try {
            if (!b || typeof b !== 'string') {
                throw new Error('Invalid input: Input should be a non-empty string');
            }
            
            var binstr = atob(b);
            const uint8Array = new Uint8Array(binstr.length);
            for (let i = 0; i < binstr.length; i++) {
                uint8Array[i] = binstr.charCodeAt(i);
            }
            const decoder = new TextDecoder('utf-8');
            return decoder.decode(uint8Array);
        } catch (error) {
            console.error('base64ToUtf8 Error:', error.message);
            return 'Error: Failed to decode base64 data.';
        }
    };    

    const getOutput = () => {
        let statusId = output?.status?.id;

        if (statusId === 6) return 'Compilation Error';
        if (statusId === 5) return 'Time limit exceeded';
        if (statusId === 3) {
            return (
                <>
                    <div>Finished at : {output.time} ms</div>
                    {console.log(output)}
                    <div>{atob(output.stdout)}</div>
                </>
            )
        }
        else return <div>{base64ToUtf8(output.stderr)}</div>
    }

    return (
        <div className="output">
            <div className="">Output :</div>
            <div className="text-white">{output !== "" && getOutput()}</div>
        </div>
    )
}

export default Output;