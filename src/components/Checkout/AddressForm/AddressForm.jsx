import { useState, useEffect } from "react"
import { Container, Typography, InputLabel, Select, MenuItem, Button, Grid, CircularProgress } from "@mui/material"
import { useForm } from "react-hook-form";
import { commerce } from "../../../lib/commerce"
import { Link } from "react-router-dom"
// css
import './addressForm.scss'

const AddressForm = ({ checkoutToken, next, setShippingCost }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');

  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');

  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  // react hook form
  const { register, formState: { errors }, handleSubmit } = useForm();
  // const onSubmit = data => console.log(data);

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));
  const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }));

  // chec fetch countries
  const fetchCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    // console.log(countries);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  }

  const fetchSubdivisions = async (checkoutTokenId, countryCode) => {
    const { subdivisions } = await commerce.services.localeListShippingSubdivisions(checkoutTokenId, countryCode);
    // console.log(subdivisions);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  }

  const fetchOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
    // console.log(options);
    setShippingOptions(options);
    setShippingOption(options[0].id);
  }

  useEffect(() => {
    if(checkoutToken) fetchCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(checkoutToken.id, shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) fetchOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>Shipping Address</Typography>
      <form className="shippingForm" onSubmit={handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
        <Grid className="shippingForm--container" container justifyContent='center' spacing={2}>
          <Grid item xs={12} sm={6}>
            <label htmlFor="name">First Name</label>
            {errors.firstName?.type === 'required' && <Typography color='error'>First name is required</Typography>}
            <input type='text' id="name" placeholder="First name"
              {...register('firstName', {
                required: true,
                minLength: 3,
                maxLength: 20
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="lastName">Last Name</label>
            {errors.lastName?.type === 'required' && <Typography color='error'>Last name is required</Typography>}
            <input type='text' id="lastName" placeholder="Last name"
              {...register('lastName', {
                required: true,
                minLength: 3,
                maxLength: 20
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="address">Address</label>
            {errors.address?.type === 'required' && <Typography color='error'>Address is required</Typography>}
            <input type='text' id="address" placeholder="Address"
              {...register('address', {
                required: true,
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="email">Email</label>
            {errors.email?.type === 'required' && <Typography color='error'>Email is required</Typography>}
            <input type='text' id="email" placeholder="Email"
              {...register('email', {
                required: true,
                minLength: 5,
                pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="city">City</label>
            {errors.city?.type === 'required' && <Typography color='error'>City name is required</Typography>}
            <input type='text' id="city" placeholder="City name"
              {...register('city', {
                required: true,
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="zip">Zip / Postal code</label>
            {errors.zip?.type === 'required' && <Typography color='error'>Postal code is required</Typography>}
            <input type='text' id="zip" placeholder="Zip / Postal"
              {...register('zip', {
                required: true,
              })}
            />
          </Grid>
          <Typography align="center" sx={{color: '#d4a373', margin: '2rem 0 0 0'}} variant="h6">Make sure your information is correct before continuing!</Typography>
        </Grid>
          {/* {(!shippingCountry.length || !shippingSubdivision.length || !shippingOption.length) && <CircularProgress color="inherit" />} */}
        <Grid sx={{padding: '1rem'}} className="fetchingForm" container justifyContent='center' spacing={3}>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <InputLabel className="fetchInput">Shipping Country</InputLabel>
            <Select
              value={shippingCountry}
              label={shippingCountry}
              fullWidth
              onChange={(e) => setShippingCountry(e.target.value)}
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <InputLabel className="fetchInput">Shipping Subdivision</InputLabel>
            <Select
              value={shippingSubdivision}
              label={shippingSubdivision}
              fullWidth
              onChange={(e) => setShippingSubdivision(e.target.value)}
            >
              {subdivisions.map((subdivision) => (
                <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <InputLabel className="fetchInput">Shipping Option</InputLabel>
            <Select
              value={shippingOption}
              label={shippingOption}
              fullWidth
              onChange={(e) => setShippingOption(e.target.value)}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Container className="shippingForm__btn" align='center'>
          <Button component={Link} to='/cart' variant="outlined">Back to Cart</Button>
          <Button type="submit" variant="contained">Next</Button>
        </Container>
      </form>
    </>
  )
}

export default AddressForm