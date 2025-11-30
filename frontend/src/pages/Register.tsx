import { useFormik } from 'formik';
import { axiosInstance } from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '../utils/toast';

const SignupForm = () => {

const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      password: '',
    },
    onSubmit: async(values) => {

        try{
            await axiosInstance.post('/users/register', {
            username: values.firstName,
            email: values.email,
            password: values.password,
            });

            navigate('/');
            showSuccess('Registration successful! Please log in.');
        }
        catch(error){
            console.error("Registration error:", error);
            showError('Registration failed. Please try again.');
        }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className='flex flex-col bg-white p-6 rounded-lg max-w-sm sm:max-w-md mx-auto mt-28 gap-4'>
      <h2 className='text-4xl font-bold text-black text-center mb-2'>
        Register
      </h2>
      <label htmlFor="firstName" className='block text-black text-lg font-semibold'>First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        placeholder='Enter your name'
        onChange={formik.handleChange}
        value={formik.values.firstName}
        className="w-full px-4 py-2 border border-black rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        required
      />
      <label htmlFor="email" className='block text-black text-lg font-semibold'>Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        onChange={formik.handleChange}
        value={formik.values.email}
        className="w-full px-4 py-2 border border-black rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        required
      />
      <label htmlFor="password" className='block text-black text-lg font-semibold'>Password</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder='Enter your password'
        onChange={formik.handleChange}
        value={formik.values.password}
        className="w-full px-4 py-2 border border-black rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        required
      />
      <button 
      type="submit"
      className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Register
      </button>
      <span className='text-black text-center '>Already have an account? <a href="/" className='font-bold text-blue-600 underline'>Login</a></span>
    </form>
  );
};

export default SignupForm;