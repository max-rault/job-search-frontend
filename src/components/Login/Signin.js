import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

const SignIn = (props) =>{

  const [pwdIcon, setPwdIcon] = useState("bi bi-eye-fill");
  const [pwdInput, setPwdInput] = useState("password");

  const schema = yup.object().shape({

    email: yup.string()
    .email("l'adresse mail n'est pas valide !")
    .required('Veuillez saisir votre adresse mail'),

    pwd: yup
    .string()
    .required("Veuillez saisir un mots de passe !")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Votre mdp doit contenir min 8 lettres, au moins une maj, un chhiffre et un caractère spéciale !"
    ),
  });

  // const handleSubmit = (event) => {
    
  //   console.log('pwd is valid : ', validatePassword(formValue.pwd))
  //   event.preventDefault();
  //   const form = event.currentTarget;

  //   if (form.checkValidity() === false) {

  //     event.stopPropagation();

  //   }

  //   setValidated(true);
  //   console.log('form values : ',  formValue)
  // };

  return(

    <Modal
      {...props}
      fullscreen="md-down"
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Authentification
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => console.log(values)}
          initialValues={{
            email: '',
            pwd: ''
          }}
        >
        
        {
          ({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) =>(

            <Form noValidate onSubmit={handleSubmit}>
    
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required 
                  type="email" 
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
    
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    
                    type={pwdInput} 
                    aria-describedby="inputGroupPrepend"
                    name="pwd"
                    value={values.pwd}
                    onChange={handleChange}
                    isInvalid={!!errors.pwd}
                  />

                  <Button
                    onClick={() =>{
                      if(pwdInput === "password"){

                        setPwdIcon('bi bi-eye-slash-fill')
                        setPwdInput('text')

                      } else if(pwdInput === "text"){
                        setPwdIcon('bi bi-eye-fill')
                        setPwdInput('password')
                      }
                    }}
                  >
                    <i class={pwdIcon}></i>
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errors.pwd}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

    
              <Button type="submit">Envoyer</Button>
            </Form>

          )
        
        }
        
        </Formik>          
      </Modal.Body>
    </Modal>
  )
}

export default SignIn
