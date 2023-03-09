import { useState, useEffect } from "react"
import { Typography, InputLabel, Select, MenuItem, Button, Grid, CircularProgress } from "@mui/material"
// import { useForm, FormProvider } from "react-hook-form"
import { commerce } from "../../../lib/commerce"
import { Link } from "react-router-dom"
// css
import './addressForm.scss'

const AddressForm = () => {
  const [error, setError] = useState(false);

  // form state
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if([name, lastname, address, email, city, zip].includes('')) {
      setError(true);
      return;
    }
    setError(false);
  }

  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>Shipping Address</Typography>
      {error && <Typography sx={{color: 'white', backgroundColor: '#e17272'}} align="center">Todos los campos son obligatorios</Typography>}
      <form className="form" onSubmit={handleFormSubmit}>
        <Grid className="form__container" container justifyContent='center' spacing={2}>
          <Grid item xs={12} sm={6}>
            <label htmlFor="name">First Name</label>
            <input type='text' value={name} id="name" placeholder="Your first name" onChange={(e) => setName(e.target.value)}  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="lastName">Last Name</label>
            <input type='text' value={lastname} id="lastName" placeholder="Your last name" onChange={(e) => setLastname(e.target.value)}  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="address">Address</label>
            <input type='text' value={address} id="address" placeholder="Your address" onChange={(e) => setAddress(e.target.value)}  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="email">Email</label>
            <input type='email' value={email} id="email" placeholder="Your email" onChange={(e) => setEmail(e.target.value)}  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="city">City</label>
            <input type='text' value={city} id="city" placeholder="City" onChange={(e) => setCity(e.target.value)}  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="zip">Zip</label>
            <input type='text' value={zip} id="zip" placeholder="Postal code" onChange={(e) => setZip(e.target.value)}  />
          </Grid>
        </Grid>
        <button style={{display: 'block', padding: '.4rem 1rem', margin: '1rem auto', cursor: 'pointer'}} type="submit">Send</button>
      </form>
    </>
  )
}

export default AddressForm