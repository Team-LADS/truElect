import './profile.css'
import {MdVerified} from 'react-icons/md'
import Pack from '../../components/Pack'
import { useStorageContext } from '../../context/storageContext'
import {Link} from 'react-router-dom'
import {ImCross} from 'react-icons/im'
const Profile = () => {
  const {userProfile,isVerified} = useStorageContext();
  return (
    <section id='profile'>
      <div className="backdrop">
        
      </div>
      <div className="container profile__container">
      <Link to="/" className='close'><ImCross/></Link>
       {userProfile && <div className="profile">
          <div className="profile__image">
            <div className="profile__image-img">
              <img src={`${userProfile.pi}`}/>
            </div>
            <div className="profile__image-details">
                <h3>{userProfile.fullName}</h3>
                  {
                    isVerified && <span className="is__verified-true"><MdVerified/>  Verified</span>
                  }
                  {
                    !isVerified && <span className="is__verified-false"><MdVerified/>  Unverified</span>
                  }
            </div>
            
          </div>
          <div className="profile__details">
            <Pack className="profile__details-card">
              <h3>Quick Info</h3>
              <div className="card card-1">
                <span>Display Name</span>
                <h4>{userProfile.fullname}</h4>
              </div>
              <div className="card card-2">
                <span>Email</span>
                <h4>{userProfile.email}</h4>
              </div>
              <div className="card card-2">
                <span>Country</span>
                <h4>{userProfile.country}</h4>
              </div>
            </Pack>
            <Pack className="profile__details-card">
              <h3>Gen Info</h3>
              <div className="card card-1">
                <span>Age</span>
                <h4>{userProfile.age}</h4>
              </div>
              <div className="card card-2">
                <span>Gender</span>
                <h4>{userProfile.gender}</h4>
              </div>
              <div className="card card-2">
                <span>Marital Status</span>
                <h4>{userProfile.maritalstatus}</h4>
              </div>
            </Pack>
            <Pack className="profile__details-card">
              <h3>Contact Info</h3>
              <div className="card card-3">
                <span>Address</span>
                <h4>{userProfile.address}</h4>
              </div>
              <div className="card card-3">
                <span>State</span>
                <h4>{userProfile.state}</h4>
              </div>
              <div className="card card-2">
                <span>Zip Code</span>
                <h4>{userProfile.zip}</h4>
              </div>
              <div className="card card-2">
                <span>Country</span>
                <h4>{userProfile.country}</h4>
              </div>
            </Pack>
            <Pack className="profile__details-card">
              <h3>Identifier Info</h3>
              <div className="card card-3">
                <span>Wallet Address</span>
                <h4>{userProfile.walletAddress}</h4>
              </div>
              <div className="card card-2">
                <span>Voter's Card Number</span>
                <h4>{userProfile.vin}</h4>
              </div>
              {/* <div className="card card-2">
                <span>Phone Number</span>
                <h4>+2340900000000</h4>
              </div> */}
            </Pack>
            <Pack className="profile__details-card">
              <h3>Status</h3>
              <div className="card card-3">
                {
                  isVerified &&  <span>Verified</span>
                }
                {
                  !isVerified &&  <span>Unverified</span>
                }
             
                <h4> {

                    isVerified && <span className="is__verified-true"><MdVerified/></span>
                  }
                  {
                    !isVerified && <span className="is__verified-false"><MdVerified/></span>
                  }</h4>
              </div>
              <div className="card card-2">
                <span>Registered</span>
                
                <h4>
                  {
                    userProfile&& <span className="is__verified-true"><MdVerified/></span>
                  }
                  {
                    !userProfile  && <span className="is__verified-false"><MdVerified/></span>
                  }
                </h4>
              </div>
            </Pack>
            <h5>Only Tru-Elect does it better!</h5>
          </div>
        </div>} 
      </div>
    </section>
  )
}

export default Profile