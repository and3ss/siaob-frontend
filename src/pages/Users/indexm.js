import React from "react";
import * as yup from "yup";
import { pt } from 'yup-locale-pt';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from "../../components/FormsUI/FormInput";

yup.setLocale(pt);
const validationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

function App(props) {

  const { handleSubmit, control, formState:{ errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ padding: "10px" }}>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <FormInput control={control} name="firstName" label="first Name" errorobj={errors}/>
          <FormInput control={control} name="lastName" label="last Name" errorobj={errors}/>
          {/* <Controller
            render={({ field }) => <Input {...field} />}
            name="firstName"
            control={control}
            defaultValue=""
            className="materialUIInput"
          /> */}
          {/* <Input2 control={control} name="FirstName" /> */}

          {/* <input {...register("age")} />
          <p>{errors.age?.message}</p> */}
          
          <input type="submit" />
        </form>
        {/* <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormInput control={control} name="name" label="Name" required={false} errorobj={errors}/>
            </Grid>
            <Grid item xs={6}>
              <input type="submit" />
            </Grid>
          </Grid>
        </form> */}
      </div>
    </div>
  );
}

export default App;