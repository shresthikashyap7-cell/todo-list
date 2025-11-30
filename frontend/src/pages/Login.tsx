import { useFormik } from 'formik';
import { axiosInstance } from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '../utils/toast';

const LoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post('/users/login', {
          email: values.email,
          password: values.password,
        });

        console.log("Login successful:", response);

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          showSuccess('Login successful!');
          navigate('/home');
        }
      } catch (error) {
        console.error("Login error:", error);
        showError('Login failed. Please check your credentials and try again.');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='flex flex-col bg-white p-6 rounded-lg max-w-sm sm:max-w-md mx-auto mt-32 gap-4'>
      <h2 className='text-4xl font-bold text-black text-center mb-2'>
        Login
      </h2>
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
        placeholder="Enter your password"
        onChange={formik.handleChange}
        value={formik.values.password}
        className="w-full px-4 py-2 border border-black rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        required
      />
      
      <button 
      type="submit"
      className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >Login</button>

      <span className='text-black text-center '>Create a new account <a href="/register" className='font-bold text-blue-600 underline'>Register</a></span>
    </form>
  );
};

export default LoginForm;