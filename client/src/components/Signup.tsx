import { useState } from "react"

export const Signup = ()=> {
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [confirmPassword, setConfirmPassword]= useState('')
    const [isSubmitting, setIsSubmitting]= useState(false)
    const [errors, setErrors]= useState<string[]>([]);

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement> )=> {
        e.preventDefault(); //after clicking submit button it will prevent the reloading of page so that the feilds inside the input tag don't get removed unless we change the state of input tags.
        setIsSubmitting(true)

        if(password != confirmPassword){
            setErrors(['Password and Confirm password must match']);
            setIsSubmitting(false);
            return;
        }

        await new Promise((resolve)=> setTimeout(resolve, 1000));
        //after the submit button get enable after getting disabled for 1sec we'll alter the states of input tags done below-
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setIsSubmitting(false) //By setting it false and also bcz of above setTimeout after we click the submit button , the submit button will get disable for 1 sec and then will get enable by setting setIsSubmitting(false)

    }


    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
            {errors.length > 0 && (
                <ul>
                    {errors.map((error)=> (
                        <li key={error} className=" bg-red-100 text-red-500 px-4 py-2 rounded">
                            {error}
                        </li>
                    ))}
                </ul>
            )}
            <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className=" px-4 py-2 rounded" />
            <input required value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className=" px-4 py-2 rounded" />
            <input required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" className=" px-4 py-2 rounded" />
            <button disabled={isSubmitting} type="submit" className=" bg-blue-500 disabled:bg-gray-500 py-2 rounded">Submit</button>


        </form>
    )
}