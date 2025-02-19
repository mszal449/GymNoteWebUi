import React, { useEffect, useState } from 'react'
import Template from '../models/Template';


const Dashboard = () => {
  const [templates, setTemplates] = useState<Template[] | null>(null);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/template`,
        {
          method: "GET",
          credentials: "include"
        }
      );

      const data = (await response.json()).data as Template[];
      console.log(data);
      setTemplates(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };


  useEffect(()=> {
    fetchTemplates();
  }, [])


  return (
    <div className='flex flex-col items-center w-full'>
      <div className='text-xl'>Dashboard</div>
      <div>
        <div className='flex justify-end pt-4 w-full '>
          {templates && templates.toString()}
        </div>
      </div>
    </div>
  )
}

export default Dashboard