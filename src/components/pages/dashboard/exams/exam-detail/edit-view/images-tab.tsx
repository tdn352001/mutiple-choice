import Paginate from "@/components/custom/paginate";
import SearchImages from "@/components/search-box/search-images";
import LoadingPage from "@/components/templates/loading-page";
import { Button, buttonVariants } from "@/components/ui/button";
import { useViewPortRef } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useGetImagesQuery,
  useUpdateImageMutation,
  useUploadImageMutation,
} from "@/hooks/services/images";
import { MAX_IMAGE_SIZE } from "@/lib/constants/api";
import { getImagePath } from "@/lib/get-image-path";
import { BaseApiQueryParams, OrderParam } from "@/lib/types/query-params";
import { cn } from "@/lib/utils";
import { Exam } from "@/services/exams";
import { ExamImage } from "@/services/images";
import { Modals, useOpenModal } from "@/store/modal";
import { useQueryClient } from "@tanstack/react-query";
import { Copy, Download, Edit, Trash } from "lucide-react";
import pMap from "p-map";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FileRejection, FileWithPath, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

interface ImagesTabProps {
  exam: Exam;
}

const ImagesTab = ({ exam }: ImagesTabProps) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const params = useMemo((): BaseApiQueryParams => {
    const perPage = 12;
    const sort = "date_created";
    const order = OrderParam.Desc;

    return {
      page: page + 1,
      per_page: perPage,
      sort_by: sort,
      order_by: order,
      search: search,
    };
  }, [page, search]);

  const { data, isPending } = useGetImagesQuery(
    { examId: exam.id, params },
    {
      staleTime: 1000 * 15,
    },
  );
  const images = data?.images || [];
  const totalPages = data?.meta.total_pages ?? 1;

  const shouldChangePage = images.length === 0 && page > 0;

  const viewportRef = useViewPortRef();

  useEffect(() => {
    if (shouldChangePage) {
      setPage(0);
    }
  }, [shouldChangePage]);

  return (
    <div>
      <div className="flex flex-col-reverse items-start gap-2 md:flex-row md:justify-between md:items-center">
        <SearchImages search={search} setSearch={setSearch} />
        <UploadImage examId={exam.id} />
      </div>

      <div>
        {isPending ? (
          <div className="min-h-[40dvh] grid place-items-center">
            <LoadingPage />
          </div>
        ) : (
          <ImageList images={images} />
        )}
      </div>
      <Paginate
        forcePage={page}
        pageCount={totalPages}
        onPageChange={({ selected }) => {
          if (viewportRef.current) {
            viewportRef.current.scrollTo({ top: 0, behavior: "smooth" });
          }
          setPage(selected);
        }}
      />
    </div>
  );
};

const UploadImage = ({ examId }: { examId: string | number }) => {
  const { mutateAsync: uploadImage } = useUploadImageMutation(examId);

  const queryClient = useQueryClient();

  const handleFileDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length) {
        toast.error(
          "Maximum file size is 3MB. Max 20 files allowed. Only .png, .jpg, .jpeg, .webp files are allowed.",
        );
        return;
      }

      if (acceptedFiles.length) {
        const uploadImages = pMap(
          acceptedFiles,
          (file) => uploadImage({ image: file }),
          {
            concurrency: 2,
            stopOnError: false,
          },
        );

        toast.promise(uploadImages, {
          loading: `Uploading ${acceptedFiles.length} images...`,
          success: (result) => {
            queryClient.invalidateQueries({
              queryKey: ["images"],
            });

            return "Images uploaded successfully";
          },
          error: (error) => {
            queryClient.invalidateQueries({
              queryKey: ["images"],
            });
            const failedFailed = error?.errors?.length;
            return failedFailed
              ? `Failed to upload ${failedFailed} images`
              : "Failed to upload images";
          },
        });
      }
    },
    [queryClient, uploadImage],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
    },
    multiple: true,
    minSize: 1,
    maxSize: MAX_IMAGE_SIZE,
    maxFiles: 20,
    noDrag: true,
    noKeyboard: true,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button>Add image</Button>
    </div>
  );
};

interface ImageListProps {
  images: ExamImage[];
}

const ImageList = ({ images }: ImageListProps) => {
  const openPreviewModal = useOpenModal(Modals.PREVIEW_IMAGE);
  const openDeleteModal = useOpenModal(Modals.DELETE_IMAGE);

  const [_, copy] = useCopyToClipboard();

  return (
    <div>
      {images.length === 0 ? (
        <p className="w-full min-h-[40dvh] py-6 flex items-center justify-center">
          No images found
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
          {images.map((image) => {
            const handlePreview = () => {
              openPreviewModal({
                imageUrl: getImagePath(image.image_path),
              });
            };

            return (
              <li key={image.id} className="w-full">
                <div className="w-full flex flex-col gap-1 lg:gap-2">
                  <div className="w-full overflow-hidden aspect-video relative rounded-lg border bg-card shadow-sm group cursor-pointer">
                    <img
                      className="absolute p-1 inset-0 size-full object-contain"
                      src={getImagePath(image.image_path)}
                      alt={image.image_name}
                    />
                    <div
                      className="absolute inset-0 light:bg-white/60  dark:bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={handlePreview}
                    >
                      <div
                        className="absolute top-2 right-2 flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => copy(image.image_name)}
                              >
                                <Copy size={16} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy name</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <a
                                className={cn(
                                  buttonVariants({
                                    size: "icon",
                                    variant: "ghost",
                                  }),
                                )}
                                download={image.image_name}
                                href={getImagePath(image.image_path)}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Download size={16} />
                              </a>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <EditImage image={image} />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Replace</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                  openDeleteModal({ image });
                                }}
                              >
                                <Trash size={16} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                  <p className="line-clamp-3 break-all">{image.image_name}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

interface EditImageProps {
  image: ExamImage;
}

const EditImage = ({ image }: EditImageProps) => {
  const { mutateAsync: updateImage, isPending } = useUpdateImageMutation(
    image.id,
  );

  const queryClient = useQueryClient();

  const handleFileDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length) {
        toast.error(
          "Maximum file size is 3MB. Only .png, .jpg, .jpeg, .webp files are allowed.",
        );
        return;
      }

      if (acceptedFiles.length) {
        const formData = new FormData();
        const file = acceptedFiles[0];
        formData.append("image", file);

        toast.promise(
          updateImage({
            image: file,
          }),
          {
            loading: "Uploading image...",
            success: () => {
              queryClient.invalidateQueries({
                queryKey: ["images"],
              });

              return "Image uploaded.";
            },
            error: "Failed to update image",
          },
        );
      }
    },
    [queryClient, updateImage],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
    },
    multiple: true,
    minSize: 1,
    maxSize: MAX_IMAGE_SIZE,
    maxFiles: 20,
    noDrag: true,
    noKeyboard: true,
    noClick: isPending,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button size="icon" variant="ghost" disabled={isPending}>
        <Edit size={16} />
      </Button>
    </div>
  );
};

export default ImagesTab;
