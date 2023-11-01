import { Button, Table } from 'ui';
import type { NextPageLayout } from '../_app';
import Layout from '../../components/layout';

const HomePage: NextPageLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col w-[75%]">
        <Button className="mb-4">Upload Document</Button>
        <Table>
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Filename
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Filetype
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Filesize
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Example.docx</td>
              <td className="px-6 py-4 whitespace-nowrap">Docx</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  3 MB
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="px-2 py-1 text-xs font-semibold text-blue-600 hover:text-blue-800">
                  Download
                </button>
                <button className="px-2 py-1 text-xs font-semibold text-red-600 hover:text-red-800">
                  Fill & Sign
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Example2.docx</td>
              <td className="px-6 py-4 whitespace-nowrap">Docx</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  5 MB
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="px-2 py-1 text-xs font-semibold text-blue-600 hover:text-blue-800">
                  Download
                </button>
                <button className="px-2 py-1 text-xs font-semibold text-red-600 hover:text-red-800">
                  Fill & Sign
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

HomePage.getLayout = Layout;

export default HomePage;
