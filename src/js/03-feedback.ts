import throttle from 'lodash.throttle';

type Data = {
    email: string;
    message: string;
  };

const initialData: Data = {email: '', message: ''}

const formRef: HTMLFormElement | null = document.querySelector('.feedback-form');
const FEEDBACK_FORM_STATE: string = 'feedback-form-state';

formRef?.addEventListener('input', throttle(inputFormFields, 500));
formRef?.addEventListener('submit', submitForms);
addEventListener('DOMContentLoaded', updateFormFields);

function inputFormFields(e: Event): void {
  const target = e.target as HTMLInputElement;
  const storageData: Data = loadData(FEEDBACK_FORM_STATE, initialData);
  if (storageData) {
    if (target.name in storageData) {
      storageData[target.name as keyof Data] = target.value;
      saveData(FEEDBACK_FORM_STATE, storageData);
    } else {
      console.error('Invalid field name:', target.name);
    }
  }}

function submitForms(e: SubmitEvent) {
  e.preventDefault();
  validateForm(e);
  const form = e.currentTarget as HTMLFormElement | null
  const submitdData: Data = loadData(FEEDBACK_FORM_STATE, initialData);
  if (Object.keys(submitdData).length === 2 && form) {
    form.reset();
    console.log(submitdData);
    localStorage.removeItem(FEEDBACK_FORM_STATE);
  }
}

function updateFormFields(): void {
  const updateData: Data = loadData(FEEDBACK_FORM_STATE, initialData);
  if(formRef) {
    formRef.email.value = updateData.email || '';
    formRef.message.value = updateData.message || '';
  }
}

function saveData(key: string, value: Data): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Set state error: ', (error as Error).message);
  }
}

function loadData(key: string, defaultValue: Data): Data {
  try {
    const item: string | null = localStorage.getItem(key);
    const result: Data = item ? JSON.parse(item) : defaultValue;
    return result;
  } catch (error) {
    console.error('Get state error: ', (error as Error).message);
    return initialData;
  }
}

function validateForm(e: SubmitEvent): void {
    const target = e.currentTarget as HTMLFormElement;
    const formData: FormData = new FormData(target);
    let isEmpty: boolean = false;

    formData.forEach((value) => {
        if (value === '') {
        isEmpty = true;
        }
    });

    if (isEmpty) alert('Please fill in all the fields!');
}
