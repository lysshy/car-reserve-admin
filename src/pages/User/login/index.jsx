import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert } from 'antd';
import React from 'react';
import ProForm, {  ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import styles from './index.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const intl = useIntl();

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
      {status === 'error' && loginType === 'account' && !submitting && (
        <LoginMessage
          content={intl.formatMessage({
            id: 'pages.login.accountLogin.errorMessage',
            defaultMessage: '账户或密码错误（admin/ant.design)',
          })}
        />
      )}

			<div className={styles.loginForm}>
        <ProFormText
					name="username"
					fieldProps={{
						size: 'large',
						prefix: <UserOutlined className={styles.prefixIcon} />,
					}}
					placeholder={'admin'}
					rules={[
						{
							required: true,
							message: (
								<FormattedMessage
									id="pages.login.username.required"
									defaultMessage="请输入用户名!"
								/>
							),
						},
					]}
				/>
				<ProFormText.Password
					name="password"
					fieldProps={{
						size: 'large',
						prefix: <LockOutlined className={styles.prefixIcon} />,
					}}
					placeholder={'admin'}
					rules={[
						{
							required: true,
							message: (
								<FormattedMessage
									id="pages.login.password.required"
									defaultMessage="请输入密码！"
								/>
							),
						},
					]}
            />
        </div>
        
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="rememberMe">
            <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
          </ProFormCheckbox>
          
        </div>
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
