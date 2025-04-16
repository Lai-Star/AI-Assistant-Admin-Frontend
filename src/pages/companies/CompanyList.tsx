import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import config from '../../../config/index';
import { Card, CardContent } from '@/components/ui/card';
// import { Eye, Edit, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import CompanyDetail from '@/pages/companies/CompanyDetail';
import TitleComponent from '@/components/TitleComponent';
import ModalDeleteComponet from '@/components/ModalDeleteComponet';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import logoNoSearch from '@/assets/icons/svg/Group 47851.svg';

interface LeaderUser {
    name: string;
    email: string;
}

interface Company {
    id: string;
    name: string;
    leader_user?: LeaderUser;
    member_cnt: number;
    created_at: string;
}

const CompanyList: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const itemsPerPage = 5;

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
    const [noResults, setNoResults] = useState<boolean>(false);

    const { toast } = useToast();

    const fetchCompanies = async () => {
        try {
            const headers = {
                'Authorization': `${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.get(`http://${config.serverUrl}/api/companies/all`, {
                headers,
                params: {
                    page,
                    limit: itemsPerPage,
                    name: searchTerm,
                },
            });
            setCompanies(response.data.data);
            setTotalItems(response.data.meta.total);
            setTotalPages(response.data.meta.total_pages);
            setNoResults(response.data.data.length === 0);
        } catch (error) {
            console.error('Error when searching companies', error);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, [page, searchTerm, itemsPerPage]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const openModal = (companyId: string) => {
        setSelectedCompanyId(companyId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCompanyId(null);
    };

    const handleDelete = async () => {
        if (!selectedCompanyId) return;

        try {
            await axios.delete(`http://localhost:3000/companies/${selectedCompanyId}`);
            toast({
                title: 'Deletion Completed!',
                variant: 'success',
            });
            setCompanies((prevCompanies) => prevCompanies.filter((company) => company.id !== selectedCompanyId));
            closeModal();
        } catch (error) {
            console.error('Error deleting company:', error);
            toast({
                title: 'Error deleting company.',
                variant: 'destructive',
            });
        }
    };

    const openDetail = (companyId: string) => {
        setSelectedCompanyId(companyId);
        setIsDetailOpen(true);
    };

    const closeDetail = () => {
        setIsDetailOpen(false);
        setSelectedCompanyId(null);
    };

    return (
        <Layout>
            <Toaster />
            <TitleComponent>Companies</TitleComponent>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <Input
                        type="text"
                        placeholder="Search Name"
                        className="max-w-xs bg-white"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Link to={'/companies/add/'}>
                        <Button className="bg-primary-400 text-white">Register Company</Button>
                    </Link>
                </div>
                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        {noResults ? (
                            <CardContent>
                                <div className="flex flex-col justify-center items-center h-96 bg-white py-40">
                                    <img src={logoNoSearch} alt="Logo" className="max-w-full h-[350px] align- p-4" />
                                    <h1 className="font-bold p-2">No Results Found</h1>
                                    <p>No results could be found for your search.</p>
                                    <p>Try redoing your search to find what you're looking for.</p>
                                </div>
                            </CardContent>
                        ) : (
                            <>
                                {companies.length > 0 ? (
                                    <table className="min-w-full table-auto">
                                        <thead className="bg-black">
                                            <tr className="text-white">
                                                <th className="text-left px-4 py-2">Name</th>
                                                <th className="text-left px-4 py-2">Leader Name</th>
                                                <th className="text-left px-4 py-2">Leader Email</th>
                                                <th className="text-left px-4 py-2">Member Count</th>
                                                <th className="text-left px-4 py-2">Created Date</th>
                                                <th className="text-left px-4 py-2"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {companies.map((company) => (
                                                <tr className="border-b" key={company.id}>
                                                    <td className="px-4 py-2 text-left">{company.name}</td>
                                                    <td className="px-4 py-2 text-left">{company.leader_user ? company.leader_user.name : ''}</td>
                                                    <td className="px-4 py-2 text-left">{company.leader_user ? company.leader_user.email : ''}</td>
                                                    <td className="px-4 py-2 text-left">{company.member_cnt}</td>
                                                    <td className="px-4 py-2 text-left">{new Date(company.created_at).toLocaleDateString()}</td>
                                                    <td className="px-4 py-2 text-right">
                                                        <button className="text-black-500 mr-2" onClick={() => openDetail(company.id)}>
                                                            {/* <Eye className="inline-block w-5 h-5" /> */}
                                                        </button>
                                                        <button className="text-black-500 mr-2" onClick={() => navigate(`/companies/edit/${company.id}`)}>
                                                            {/* <Edit className="inline-block w-5 h-5" /> */}
                                                        </button>
                                                        <button className="text-black-500" onClick={() => openModal(company.id)}>
                                                            {/* <Trash className="inline-block w-5 h-5" /> */}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="flex flex-col justify-center items-center h-96 bg-white">
                                        <h1 className="font-bold">No Registered Companies</h1>
                                        <p>Click on "Register Company" to start registering.</p>
                                    </div>
                                )}
                            </>
                        )}
                        <ModalDeleteComponet
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onDelete={handleDelete}
                            title={'Do you want to delete?'}
                            description={'The company will be deleted.'}
                        />
                        {isDetailOpen && <CompanyDetail companyId={selectedCompanyId} onClose={closeDetail} />}
                    </div>
                </Card>
                
                {/* Pagination controls */}
                {/* <Pagination /> */}
                <div className="flex justify-between mt-4">
                    <div className="text-gray-600">
                        <span>
                            Total items: <b>{totalItems}</b>
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="">
                            Items per page <b>{itemsPerPage}</b>{' '}
                        </span>
                        <button
                            onClick={handlePrevPage}
                            disabled={page === 1}
                            className="text-black py-2 px-4 rounded-lg"
                        >
                            &lt;
                        </button>
                        <button className="bg-primary-400 text-white py-2 px-4 rounded-lg">
                            <b>{page}</b>
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={page === totalPages}
                            className="text-black py-2 px-4 rounded-lg"
                        >
                            &gt;
                        </button>
                        <span className="">
                            <b>from {totalPages}</b>
                        </span>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CompanyList;