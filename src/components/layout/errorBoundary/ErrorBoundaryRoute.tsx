import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { useRouteError } from 'react-router-dom';

import { MainRoutes } from '../../../router/routes/MainRoutes.ts';

interface RouteError {
  code?: number;
  details?: string;
  message?: string;
  stack?: string;
}
const { Paragraph, Text } = Typography;
const ErrorPoint = () => <CloseCircleOutlined className={'text-red-500'} />;
export const ErrorBoundaryRoute = () => {
  const navigate = useNavigate();
  const error: unknown = useRouteError();
  function formatStackTrace(stack?: string) {
    const urlRegex = /(https?:\/\/\S+)/g;
    if (stack)
      return stack
        ?.replace(
          urlRegex,
          (url) => `<a href="${url}" target="_blank">${url}</a>`
        )
        ?.replace(/\n/g, '<br>');
    return '';
  }
  let errorMessage, errorCode, errorDetails, stackTrace;
  if (error) {
    const e = error as RouteError;
    errorMessage = e.message;
    errorCode = e.code;
    errorDetails = e.details;
    stackTrace = e.stack;
  }
  return (
    <Result
      extra={[
        <Button
          key={'go_home'}
          onClick={() => navigate(`../${MainRoutes.HOME}`)}
        >
          Go to Homepage
        </Button>
      ]}
      className={'px-0'}
      status="error"
      subTitle="Please report this error to support"
      title="Application Error"
    >
      <Paragraph>
        <Text
          style={{
            fontSize: 16
          }}
          strong
        >
          The content you requested has the following error:
        </Text>
      </Paragraph>
      <Paragraph>
        <div>
          <ErrorPoint />
          <Text type={'danger'}> Message: </Text>
        </div>
        <Text strong>{errorMessage}</Text>
      </Paragraph>
      <Paragraph>
        <div>
          <ErrorPoint />
          <Text type={'danger'}> Details:</Text>
        </div>{' '}
        {errorDetails}
      </Paragraph>
      <Paragraph>
        <div>
          <ErrorPoint />
          <Text type={'danger'}> Code:</Text>
        </div>{' '}
        {errorCode}
      </Paragraph>
      <Paragraph>
        <div>
          <ErrorPoint />
          <Text type={'danger'}> Stack Trace:</Text>
        </div>
        <br />
        <code
          dangerouslySetInnerHTML={{
            __html: formatStackTrace(stackTrace)
          }}
        />
      </Paragraph>
    </Result>
  );
};
