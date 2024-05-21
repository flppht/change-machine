import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { changeStateOfChange } from "../store/slices/ChangeMachineSlice";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";

const MachineInitForm = ({ setShowMachineInit }) => {
  const dispatch = useDispatch();

  const initialValues = {
    machineState: [
      { denomination: 5, count: null },
      { denomination: 2, count: null },
      { denomination: 1, count: null },
      { denomination: 0.5, count: null },
      { denomination: 0.2, count: null },
      { denomination: 0.1, count: null },
    ],
  };

  const validationSchema = Yup.object().shape({
    machineState: Yup.array().of(
      Yup.object().shape({
        denomination: Yup.number(),
        count: Yup.number()
          .typeError("Enter a number")
          .min(0, "Enter number larger or equal to 0")
          .integer("Enter whole number")
          .required("You must enter the value"),
      })
    ),
  });

  const onSubmit = (data) => {
    console.log(data.machineState);
    dispatch(changeStateOfChange(data.machineState));
    setShowMachineInit(false);
  };

  return (
    <div className="machineContainer">
      <div className="text-xl font-semibold self-center my-4">
        Set initial state of machine
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="formContainer w-96 flex-row">
            <FieldArray name="machineState">
              {() => (
                <>
                  {values.machineState.length > 0 &&
                    values.machineState.map((change, index) => (
                      <div key={index} className="flex flex-col my-1">
                        <label>Amount of {change.denomination}BAM coins</label>
                        <ErrorMessage
                          name={`machineState.${index}.count`}
                          component="span"
                        />
                        <Field
                          name={`machineState.${index}.count`}
                          placeholder="Enter amount"
                          className="rounded-md px-2 py-1"
                        />
                      </div>
                    ))}
                  <button
                    type="submit"
                    className="bg-slate-500 rounded-md p-2 text-white mt-4"
                  >
                    Initialize machine
                  </button>
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MachineInitForm;
