import './register.css';
import {BiError, BiHandicap} from 'react-icons/bi'
import { useState } from 'react';
import { useStorageContext } from '../../context/storageContext';
import { useContractContext } from '../../context/contractContext/contractContext';
import {Link} from 'react-router-dom';
import {ImCross} from 'react-icons/im'
import {IoIosPersonAdd} from 'react-icons/io'

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
const Register = () => {
    const [formData,setFormData] = useState();
    const {uploadUserProfile,notifyWarning} = useStorageContext();
    const {currentAccount} = useContractContext();

    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        const form = await toBase64(e.target.elements[8].files[0]);
        const elements = Array.from(e.target.elements)
        let rformData = await elements.map(element =>{
        if(element.name.toLowerCase()=== 'pi') return [element.name, form];
        return [element.name,element.value];
       })
       rformData.push(["walletAddress",currentAccount]);
       rformData.push(["isVerified",false])
       setFormData(Object.fromEntries(rformData))
       console.log("userform",formData)
       //upload the user form if there is a connected wallet
       if(currentAccount && formData){
        await uploadUserProfile(formData)
       }else if(!currentAccount){
        notifyWarning('Please connect your wallet');
       }else if(!formData){
        notifyWarning('Ensure to fill in your correct details.')
       }
    }



  return (
    <section className="register">
        <div className="container registration__container">
        
        <div className="form__element">
        <Link to="/" className='close'><ImCross/></Link>
        <h2>Register</h2>
        <div className="icon"><IoIosPersonAdd/></div>
        <form onSubmit={(e)=>handleFormSubmit(e)}>
            <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id='fullName' name='fullName' placeholder='Full Name' required/>
                <i className="error"><BiError/></i>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' name='email' placeholder='Email' required/>
                <i className="error"><BiError/></i>
            </div>
            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" id='address' name='address' placeholder='Address' required/>
                <i className="error"><BiError/></i>
            </div>
            <div className="form-group maingroup">
                <div className="form-group subgroup">
                    <label htmlFor="dob">Date Of Birth</label>
                    <input type="date" id='dob' name='dob' placeholder='Date Of Birth' required/>
                    <i className="error"><BiError/></i>
                </div>
                <div className="form-group subgroup">
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" required>
                        <option value="">---</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                    <i className="error"><BiError/></i>
                </div>
            </div>
            
            <div className="form-group maingroup">
                <div className="form-group subgroup">
                    <label htmlFor="city">City</label>
                    <input type="text" id='city' name='city' placeholder='City' required/>
                    <i className="error"><BiError/></i>
                </div>
                <div className="form-group subgroup">
                    <label htmlFor="state">State</label>
                    <input type="text" name='state' placeholder='State' required/>
                    <i className="error"><BiError/></i>
                </div>
            </div>
            <div className="form-group maingroup">
                <div className="form-group subgroup">
                    <label htmlFor="zip">Zip Code</label>
                    <input type="text" id="zip" name='zip' placeholder='Zip Code' required/>
                    <i className="error"><BiError/></i>
                </div>
                <div className="form-group subgroup">
                    <label htmlFor="pi">Profile Image</label>
                    <input type="file" id='pi' name='pi' placeholder="Upload image"required />
                    <i className="error"><BiError/></i>
                </div>
            </div>
            
            <div className="form-group">
                <label htmlFor="vin">Voters Registration Number</label>
                <input type="text" id="vin" name='vin' placeholder="Voter's Registration Number" required/>
                <i className="error"><BiError/></i>
            </div>
           
            <div className="form-group">
                <input type="submit" id='submit'  value="Submit"  />
            </div>
        </form>
        </div>
        </div>
    </section>
  )
}

export default Register