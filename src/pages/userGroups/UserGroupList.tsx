import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import config from '../../../config/index';
import { Card, CardContent } from '@/components/ui/card';
// import { Eye, Edit, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import UserGroupDetail from '@/pages/userGroups/UserGroupDetail';
import TitleComponent from '@/components/TitleComponent';
import ModalDeleteComponet from '@/components/ModalDeleteComponet';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import logoNoSearch from '@/assets/icons/svg/Group 47851.svg';

interface UserGroup {
    id: string;
    name: string;
    company_name: string;
    member_cnt: number;
    created_at: string;
}

const UserGroupList: React.FC = () => {
    const [userGroups, setUserGroups] = useState<UserGroup[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const itemsPerPage = 5;

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedUserGroupId, setSelectedUserGroupId] = useState<string | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
    const [noResults, setNoResults] = useState<boolean>(false);

    const { toast } = useToast();

    const fetchUserGroups = async () => {
        try {
            const headers = {
                'Authorization': `${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.get(`${config.serverUrl}/api/user-group/all`, {
                headers,
                params: {
                    page,
                    limit: itemsPerPage,
                    name: searchTerm,
                },
            });

            console.log(response.data.data)
            setUserGroups(response.data.data);
            setTotalItems(response.data.meta.total);
            setTotalPages(response.data.meta.total_pages);
            setNoResults(response.data.data.length === 0);
        } catch (error) {
            console.error('Error when searching user groups', error);
        }
    };

    useEffect(() => {
        fetchUserGroups();
    }, [page, searchTerm, itemsPerPage]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
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

    // const openModal = (userId: string) => {
    //     setSelectedUserId(userId);
    //     setIsModalOpen(true);
    // };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUserGroupId(null);
    };

    const handleDelete = async () => {
        if (!selectedUserGroupId) return;

        try {
            await axios.delete(`${config.serverUrl}/users/${selectedUserGroupId}`);
            toast({
                title: 'Deletion Completed!',
                variant: 'success',
            });
            setUserGroups((prevUsers) => prevUsers.filter((userGroup) => userGroup.id !== selectedUserGroupId));
            closeModal();
        } catch (error) {
            console.error('Error deleting user:', error);
            toast({
                title: 'Error deleting user.',
                variant: 'destructive',
            });
        }
    };

    const openDetail = (userGroupId: string) => {
        setSelectedUserGroupId(userGroupId);
        setIsDetailOpen(true);
    };

    const closeDetail = () => {
        setIsDetailOpen(false);
        setSelectedUserGroupId(null);
    };

    return (
        <Layout>
            <Toaster />
            <TitleComponent>UserGroups</TitleComponent>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <Input
                        type="text"
                        placeholder="Search Name"
                        className="max-w-xs bg-white"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Link to={'/userGroups/add/'}>
                        <Button className="bg-primary-400 text-white">Register UserGroup</Button>
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
                                {userGroups.length > 0 ? (
                                    <table className="min-w-full table-auto">
                                        <thead className="bg-black">
                                            <tr className="text-white">
                                                <th className="text-left px-4 py-2">Group Name</th>
                                                <th className="text-left px-4 py-2">Company Name</th>
                                                <th className="text-left px-4 py-2">Member Count</th>
                                                <th className="text-left px-4 py-2">Created Date</th>
                                                <th className="text-left px-4 py-2"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userGroups.map((userGroup) => (
                                                <tr className="border-b" key={userGroup.id}>
                                                    <td className="px-4 py-2 text-left">{userGroup.name}</td>
                                                    <td className="px-4 py-2 text-left">{userGroup.company_name ?? ''}</td>
                                                    <td className="px-4 py-2 text-left">{userGroup.member_cnt}</td>
                                                    <td className="px-4 py-2 text-left">{new Date(userGroup.created_at).toLocaleDateString()}</td>
                                                    <td className="px-4 py-2 text-right">
                                                        <button className="text-black-500 mr-2" onClick={() => openDetail(userGroup.id)}>
                                                            {/* <Eye className="inline-block w-5 h-5" /> */}
                                                            View
                                                        </button>
                                                        <button className="text-black-500 mr-2" onClick={() => navigate(`/userGroups/edit/${userGroup.id}`)}>
                                                            {/* <Edit className="inline-block w-5 h-5" /> */}
                                                            Edit
                                                        </button>
                                                        {/* <button className="text-black-500" onClick={() => openModal(user.id)}>
                                                            <Trash className="inline-block w-5 h-5" />
                                                            Delete
                                                        </button> */}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="flex flex-col justify-center items-center h-96 bg-white">
                                        <h1 className="font-bold">No Registered UserGroups</h1>
                                        <p>Click on "Register UserGroup" to start registering.</p>
                                    </div>
                                )}
                            </>
                        )}
                        <ModalDeleteComponet
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onDelete={handleDelete}
                            title={'Do you want to delete?'}
                            description={'The user group will be deleted.'}
                        />
                        {isDetailOpen && <UserGroupDetail userGroupId={selectedUserGroupId} onClose={closeDetail} />}
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

export default UserGroupList;