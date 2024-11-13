"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
     Pagination, PaginationContent, PaginationEllipsis,
     PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";
import {
     Table, TableBody,
     TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { EllipsisVertical, Search } from "lucide-react";


interface Local {
     address: string;
     cep: string;
     city: string;
     cnpj: string;
     complement: string;
     email: string;
     entrance: string;
     entries: string;
     id: number;
     name: string;
     nickname: string;
     number: string;
     phone: string;
     state: string;
     type: string;
}

export default function Locais() {

     const [locais, setLocais] = useState<Local[]>([]);
     const [page, setPage] = useState(1);
     const [totalPages, setTotalPages] = useState(0);
     const [totalLocais, setTotalLocais] = useState(0);
     const [search, setSearch] = useState("");


     useEffect(() => {
          function getLocais() {
               fetch(`http://localhost:8080/places/${page}`, {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json"
                    }
               })
                    .then((response) => response.json())
                    .then((data) => {
                         setLocais(data["places"]);
                         setTotalPages(data["totalPages"]);
                         setTotalLocais(data["totalPlaces"]);
                    })
                    .catch((error) => {
                         console.error("Error:", error);
                    });
          }

          getLocais();
     }, [page]);


     const [filtredLocais, setFiltredLocais] = useState<Local[]>([]);

     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(event.target.value);

          fetch(`http://localhost:8080/places/search/${event.target.value}`, {
               method: "GET",
               headers: {
                    "Content-Type": "application/json"
               }
          })
               .then((response) => response.json())
               .then((data) => {
                    if (data && data.length > 0) {
                         setFiltredLocais(data);
                    }
               })
               .catch((error) => {
                    console.error("Error:", error);
                    setLocais([]);
                    setPage(1);
                    setTotalPages(0);
                    setTotalLocais(0);
               });
     };

     return (
          <section className="p-5 md:p-20">
               <div>
                    <h1 className="text-2xl">Locais ({totalLocais})</h1>
                    <p>
                         Confira a lista de todos os locais cadastrados.
                    </p>
               </div>
               <div className="bg-surfaces-surface p-5 rounded-lg mt-5">
                    <div className="flex justify-between">
                         <div className="flex items-center gap-4 bg-[#333B49]  
                          relative w-1/4">
                              <Search className="absolute left-2
                               w-5 h-5 text-[#6D99FB]" />
                              <Input
                                   onChange={handleSearchChange}
                                   className="w-full border-none pl-10"
                                   placeholder="Pesquise por nome do local" />
                         </div>

                         <Button onClick={() => {

                              window.location.href = "/locais/register";
                         }} className="bg-white text-black rounded-[8px] 
                              hover:bg-slate-300 hover:underline 
                              transition-all ease-in ">
                              Adicionar local
                         </Button>
                    </div>
                    <div className="p-5">
                         <Table className="my-5">
                              <TableHeader >
                                   <TableRow className="border-none">
                                        <TableHead className="font-bold">
                                             Nome do Local
                                        </TableHead>
                                        <TableHead className="font-bold">
                                             Endereço
                                        </TableHead>
                                        <TableHead className="font-bold">
                                             Cidade e Estado
                                        </TableHead>
                                        <TableHead className="font-bold">
                                             Portões Cadastrados
                                        </TableHead>
                                        <TableHead className="font-bold">
                                             Atualizações
                                        </TableHead>
                                        <TableHead className="text-right"></TableHead>
                                   </TableRow>
                              </TableHeader>
                              <TableBody>
                                   {
                                        locais.length > 0 && search.length < 1 ? locais?.map((local, idx) => {
                                             return (
                                                  <TableRow className={`${idx % 2 != 0 ? "bg-[#333B49]" : ""}`} key={idx}>
                                                       <TableCell > {local.name}</TableCell>
                                                       <TableCell>{local.address}</TableCell>
                                                       <TableCell>{local.city}</TableCell>
                                                       <TableCell>{local.entrance}</TableCell>
                                                       <TableCell>{local.id}</TableCell>
                                                       <TableCell className="text-right">
                                                            <Button>
                                                                 <EllipsisVertical />
                                                            </Button>
                                                       </TableCell>
                                                  </TableRow>
                                             );
                                        }) : filtredLocais.map((local, idx) => {
                                             return (
                                                  <TableRow className={`${idx % 2 != 0 ? "bg-[#333B49]" : ""}`} key={idx}>
                                                       <TableCell > {local.name}</TableCell>
                                                       <TableCell>{local.address}</TableCell>
                                                       <TableCell>{local.city}</TableCell>
                                                       <TableCell>{local.entrance}</TableCell>
                                                       <TableCell>{local.id}</TableCell>
                                                       <TableCell className="text-right">
                                                            <Button>
                                                                 <EllipsisVertical />
                                                            </Button>
                                                       </TableCell>
                                                  </TableRow>
                                             );
                                        })
                                   }
                              </TableBody>
                         </Table>

                         <Pagination className="">
                              <PaginationContent>
                                   <PaginationItem>
                                        <PaginationPrevious
                                             className="hover:bg-[#4E4F5B] rounded-[4px] cursor-pointer"
                                             onClick={() => {
                                                  if (page > 1) setPage(page - 1);
                                             }}
                                        />
                                   </PaginationItem>

                                   {page > 3 && (
                                        <>
                                             <PaginationItem
                                                  className="hover:bg-[#4E4F5B] rounded-[4px] cursor-pointer"
                                             >
                                                  <PaginationLink onClick={() => setPage(1)}>1</PaginationLink>
                                             </PaginationItem>
                                             {page > 4 && <PaginationEllipsis />}
                                        </>
                                   )}

                                   {[...Array(5)].map((_, index) => {
                                        const pageIndex = page - 2 + index;
                                        if (pageIndex > 0 && pageIndex <= totalPages) {
                                             return (
                                                  <PaginationItem
                                                       key={pageIndex}
                                                       className={`hover:bg-[#4E4F5B] 
                                                                 rounded-[4px] 
                                                                 cursor-pointer ${page === pageIndex ? "bg-[#4E4F5B] text-white" : ""
                                                            }`}
                                                  >
                                                       <PaginationLink onClick={() => setPage(pageIndex)}>
                                                            {pageIndex}
                                                       </PaginationLink>
                                                  </PaginationItem>
                                             );
                                        }
                                        return null;
                                   })}

                                   {page < totalPages - 2 && (
                                        <>
                                             {page < totalPages - 3 && <PaginationEllipsis />}
                                             <PaginationItem
                                                  className="hover:bg-[#4E4F5B] rounded-[4px] cursor-pointer"
                                             >
                                                  <PaginationLink onClick={() => setPage(totalPages)}>
                                                       {totalPages}
                                                  </PaginationLink>
                                             </PaginationItem>
                                        </>
                                   )}


                                   <PaginationItem>
                                        <PaginationNext
                                             className="hover:bg-[#4E4F5B] rounded-[4px] cursor-pointer"
                                             onClick={() => {
                                                  if (page < totalPages) setPage(page + 1);
                                             }}
                                        />
                                   </PaginationItem>
                              </PaginationContent>
                         </Pagination>

                    </div>
               </div >
          </section >
     );
}
