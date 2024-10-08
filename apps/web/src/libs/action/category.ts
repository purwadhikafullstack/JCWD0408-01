import { ICreateCategoryBySuperAdmin } from '@/components/inputformik';

export const createCategory = async (data: ICreateCategoryBySuperAdmin) => {
  const res = await fetch('http://localhost:8000/api/category/create', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  const response = await res.json();
  return { result: response, ok: res.ok };
};

export const getHomeCategory = async () => {
  const res = await fetch('http://localhost:8000/api/homeprod/category', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  return res.json();
};
