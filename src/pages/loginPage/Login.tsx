import { LoginPageBG, Logo } from '@images';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { MainRoutes } from '../../router/routes/MainRoutes.ts';
import {
  LocalStorage,
  LocalStorageItems
} from '../../utility/LocalStorage.tsx';

export const Login = () => {
  const navigate = useNavigate();
  const onSubmit = () => {
    LocalStorage.setItem(LocalStorageItems.AccessToken, 'token');
    navigate(MainRoutes.HOME);
  };

  const labelStyles = { color: 'white' };

  return (
    <div
      style={{
        backgroundImage: `url("${LoginPageBG}")`
      }}
      className="flex h-screen max-h-svh items-center justify-end bg-cover bg-no-repeat"
    >
      <div
        className={'w-full bg-black/75 p-16 md:h-1/3 md:w-1/2 xl:w-1/3 xl:p-24'}
      >
        <div className="mb-6 flex gap-2">
          <img alt="logo" src={Logo} />
        </div>
        <Form className={'max-w-[400px]'} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            label={<span style={labelStyles}>Username</span>}
            name="username"
            rules={[{ required: true }]}
            required
          >
            <Input data-cy="username" />
          </Form.Item>
          <Form.Item
            label={<span style={labelStyles}>Password</span>}
            name="password"
            rules={[{ required: true }]}
            required
          >
            <Input.Password data-cy="password" />
          </Form.Item>
          <div className="flex w-full flex-col justify-between gap-8 text-white md:flex-row">
            <div className="flex gap-2">
              <Form.Item
                className="flex"
                name="rememberMe"
                valuePropName="checked"
              >
                <div className="flex gap-3">
                  <span className="text-white">Remember me</span>
                  <Checkbox className="items-start" />
                </div>
              </Form.Item>
            </div>
            <div>
              <Button data-cy="login" htmlType="submit" type="primary" block>
                Log in
              </Button>
            </div>
            <div>
              <Link to="#">Forgot password?</Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
