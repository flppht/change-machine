import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  selectChangeMachine,
  setChangeState,
} from "../store/slices/ChangeMachineSlice";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";

type Props = {
  onMachineInit: () => void;
};

const MachineInitForm = ({ onMachineInit }: Props) => {
  const dispatch = useDispatch();
  const machineInitialValues = useSelector(selectChangeMachine);

  const initialValues = {
    machineState: machineInitialValues,
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
    dispatch(setChangeState(data.machineState));
    onMachineInit();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-semibold self-center my-4">
        Set initial state of machine
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="flex flex-col h-auto rounded-lg p-5 bg-zinc-100 w-96 shadow-md">
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
                          className="text-red-500 italic text-sm ml-1 pb-1"
                        />
                        <Field
                          name={`machineState.${index}.count`}
                          placeholder="Enter amount"
                          className="rounded-md px-2 py-1 bg-white"
                        />
                      </div>
                    ))}
                  <button
                    type="submit"
                    className="bg-slate-500 rounded-md p-2 text-white mt-4 hover:bg-slate-600"
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
