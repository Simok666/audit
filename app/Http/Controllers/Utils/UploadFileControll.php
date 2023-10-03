<?php

namespace App\Http\Controllers\Utils;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Session;
use Validator;
use File;
use Storage;
use Carbon\Carbon;
use Intervention\Image\ImageManagerStatic as Image;

class UploadFileControll extends Controller
{
    protected $PathControll;

    public function __construct()
    {

        $this->PathControll = new PathControll();

    }

    public function uploadFile($uploadedFile, $folder=0, $labelName=''){
        $filepath='';
        try {
            $exten = $uploadedFile->getClientOriginalExtension();
            $exten = strtolower($exten);
            $fName = str_replace(' ', '-', pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME));

            if($labelName!=''){
                $fName = str_replace(' ', '-', $labelName);
            }

            $fileName =  $fName . Carbon::now()->format('YmdHisu') . '.' . pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_EXTENSION);

            if ($exten == 'doc' || $exten == 'docs' || $exten == 'docx' || $exten == 'xls' || $exten == 'xlss' || $exten == 'xlsx' || $exten == 'pdf') {

                $numberFolder = 1;
                if(is_int($folder) && $folder!=0){ $numberFolder = $folder; }

                $uploadedFile->move($this->PathControll->pathFile($numberFolder), $fileName);
                $filepath = $this->PathControll->pathFile($numberFolder) . $fileName;

            } elseif ($exten == 'jpg' || $exten == 'png' || $exten == 'jpeg') {

                $numberFolder = 2;
                if(is_int($folder) && $folder!=0){ $numberFolder = $folder; }

                $filepath = $this->uploadimage($uploadedFile, $numberFolder, $labelName);

            } elseif ($exten == 'mp4' || $exten == 'flv' || $exten == 'mpeg' || $exten == 'avi') {

                $numberFolder = 3;
                if(is_int($folder) && $folder!=0){ $numberFolder = $folder; }

                $uploadedFile->move($this->PathControll->pathFile($numberFolder), $fileName);
                $filepath = $this->PathControll->pathFile($numberFolder) . $fileName;
            }else{
                $uploadedFile->move($this->PathControll->pathFile(1), $fileName);
                $filepath = $this->PathControll->pathFile(1) . $fileName;
            }
        } catch (Exception $e) {
            dump($e->getMessage());
        }
        return $filepath;
    }

    public function uploadimage($file, $folder){
        $uploadedFile = $file;
        $filepath ='';

        if($uploadedFile!==null){
            if(!empty($uploadedFile)){
                try{
                    $tempimg = Image::make($uploadedFile);
                    $width = $tempimg->getWidth();
                    $height = $tempimg->getHeight();

                    if($width > $height){
                        $tempimg->resize(500, null, function ($constraint) {
                            $constraint->aspectRatio();
                        });
                    }else{
                        $tempimg->resize(null, 500, function ($constraint) {
                            $constraint->aspectRatio();
                        });
                    }

                    $fileName = time().rand(1, 99999).'.'.pathinfo($uploadedFile->getClientOriginalName(),PATHINFO_EXTENSION);
                    $tempimg->save($this->PathControll->pathFile($folder).$fileName);
                    $filepath = $this->PathControll->pathFile($folder) . $fileName;
                }catch (\Exception $e){
                    dump($e->getMessage());
                }
            }
        }
        return $filepath;
    }
}
