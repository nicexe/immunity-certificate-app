import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import QRCode from 'qrcode.react';
import * as Yup from 'yup';

import { DateField, TextField, TimeField } from '../../core/forms/fields';
import { generatePepper } from "../../core/utils";

const IssueCertificateForm = () => {

  const [qrValue, setQrValue] = useState('');

  const onCreateClick = (values) => {
    const pepper = generatePepper(8);
    setQrValue(`${values.idNumber}::${pepper}`);
  }

  return (
    <Formik
      initialValues={{
        identityMethod: 'create',
        idNumber: '',
        testKitId: '',
        expiryDate: '2021-03-29',
        expiryTime: '09:00',
        sampleDate: '2020-03-29',
        sampleTime: '09:00',
      }}
      validationSchema={Yup.object({
        idNumber: Yup.string().required('This field is required'),
        testKitId: Yup.string().required('This field is required'),
        expiryDate: Yup.string().required('This field is required'),
        expiryTime: Yup.string().required('This field is required'),
        sampleDate: Yup.string().required('This field is required'),
        sampleTime: Yup.string().required('This field is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const personHash = web3.utils.sha3(qrValue);
        const sampleTimestamp = Date.parse(`${values.sampleDate}T${values.sampleTime}`);
        const expiryTimestamp = Date.parse(`${values.expiryDate}T${values.expiryTime}`);
        issueCertificate(
          personHash,
          sampleTimestamp,
          expiryTimestamp,
          values.testKitId,
        )
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <h2>Choose Identity</h2>
          <div className="text-align-left">
            <input type="radio" id="identityMethod_1" name="identityMethod" value="create" checked />
            <label class="label-inline" htmlFor="identityMethod_1">Create new identity</label>
            <br/>
            <input type="radio" id="identityMethod_2" name="identityMethod" value="scan" />
            <label class="label-inline" htmlFor="identityMethod_2">Scan QR code</label>
          </div>

          <TextField
            label="ID Number"
            name="idNumber"
            type="text"
          />

          <button className="button" type="button" onClick={(_e) => onCreateClick(values)} >
            Create
          </button>

          {
            qrValue && (
              <div>
                <br />
                <br />
                <QRCode value={qrValue} level="H" />
                <br />
                <br />
              </div>
            )
          }
          <hr />

          <h2>Issue Certificate</h2>

          <TextField
            label="Test Kit ID"
            name="testKitId"
            type="text"
          />

          <label htmlFor="sampleDate">Sample Date and Time</label>
          <div className="row">
            <div className="column column-67">
              <DateField name="sampleDate" />
            </div>
            <div className="column column-33">
              <TimeField name="sampleTime" />
            </div>

          </div>

          <label htmlFor="expiryDate">Expiry Date and Time</label>
          <div className="row">
            <div className="column column-67">
              <DateField name="expiryDate" />
            </div>
            <div className="column column-33">
              <TimeField name="expiryTime" />
            </div>

          </div>

          <button className="button" type="submit" disabled={isSubmitting}>
            Submit
          </button>

        </Form>
      )}
    </Formik>
  );
};


export default IssueCertificateForm;