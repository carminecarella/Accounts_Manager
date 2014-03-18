window.DetailsView = Backbone.View.extend({

    initialize: function () {
        this.render();   
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));        
        return this;
    },

    events: {
        "change"        : "change",
        //"keyup"         : "change",
        "click .save"   : "beforeSave",
        "click .deleteConfirm" : "deleteAccountConfirmation",
        "click .delete" : "deleteAccount",        
        "change .btn-file"     : "uploadImage",        
        //"drop #picture" : "dropHandler"        	
    },

    change: function (event) {
    	
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        
        //not save input file modification in the model
        if(target.name != 'fileInput'){
        	change[target.name] = target.value;
        	this.model.set(change);
        } 

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id, this.model);
        }
        
        //Check picture file                            		
		this.checkFile();
    },

    beforeSave: function () {
    	$('#loadingimage').show();
        var self = this;
        
        //Check information
        var check = this.model.validateAll();        
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            $('#loadingimage').hide();
            return false;
        }
        
        //Check picture file                            		
		if(this.checkFile() == false) {			
			if(this.model.get('picture') == '-1') {
				this.model.set("picture", "-1");
			}
			$('#loadingimage').hide();
            return false;
		} 
				
		this.model.set("picture", utils.getFileName(this.model.id));
		this.saveAccount();
		this.saveFile();
        $('#loadingimage').hide();
		
        // Upload picture file if a new file was dropped in the drop area
        /*if (this.pictureFile) {
            this.model.set("picture", this.pictureFile.name);
            utils.uploadFile(this.pictureFile,
                function () {
                    self.saveWine();
                }
            );
        } else {                        
        }*/        
    },
    
    saveAccount: function () {
        var self = this;        
        this.model.save(null, {        	
            success: function (model) {
                self.render();                
                $('#loadingModal').modal('hide');
                app.navigate('accounts/' + model.id, false);                
                utils.showAlert('Success!', 'Account saved successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to save this account', 'alert-danger');
            }            
        });
    },

    deleteAccountConfirmation: function () {        
    	$('#deleteConfirmation').modal('show');    	
    },
    
    deleteAccount: function () {    	   	
    	$('#deleteConfirmation').modal('hide');
    	$('body').removeClass('modal-open');
    	$('.modal-backdrop').remove();
        this.model.destroy({
            success: function () {
            	//app.navigate('accounts', false);
                window.history.back();        
            }
        });                    	  
    },
     
    uploadImage: function (event) {
    	$('#loadingModal').modal('show');    	
    	var fileInput = event.target;
    	
		numFiles = fileInput.files ? fileInput.files.length : 1;
		
		//filename management and display    				
		if( numFiles > 0 ) {
			label = fileInput.value.replace(/\\/g, '/').replace(/.*\//, '');
			
			//$('#filenameInput').val(label);
			$('#filename').text(label);
						
			//check file			 	        
			if(this.checkFile()){
				var reader = new FileReader();
		        reader.onloadend = function () {
		            $('#pictureFile').attr('src', reader.result);
		        };
				//Read the image file from the local file system and display it in the img tag    				       
		        reader.readAsDataURL(utils.getFile());
			} else{
				$('#pictureFile').attr('src', './resources/img/user_account.png');				
				return false;
			} 				
		}		
		$('#loadingModal').modal('hide');		
    },
    
    saveFile: function() {
    	    	
    	var data = new FormData($("#fileuploadForm"));		
    	/*for (var i=0; i < files.length; i++) {
			var file = files[i];
			accountImage = files[i];			
			data.append('uploadedFile', file);
		};*/
    	
    	data.append('file', utils.getFile());
		
		$.ajax({
		    url: 'rest/accounts/upload/' + this.model.id,
		    data: data,
		    cache: false,
		    contentType: false,
		    processData: false,
		    type: 'POST',
		    
		    success: function(data){
		       
		        $('#loadingModal').modal('hide');
		        			       
		    },
		    
			error: function(data){
		        alert('no upload');
		        $('#loadingModal').modal('hide');
		    }
		});
    },
    
    checkFile: function() {
    	if(utils.checkFileExt()){    		
	        $('#saveAccountButton').prop('disabled', false);
    	    $('#deleteAccountButton').prop('disabled', false);
    	    return true;
		} else {
			utils.showAlert('Error', 'Only image files are allowed ( .jpg, .jpeg, .png )', 'alert-danger');
			$('#saveAccountButton').prop('disabled', true);
			$('#deleteAccountButton').prop('disabled', true);			
    	    $('#loadingModal').modal('hide');
    	    return false;
		}
    }
    
    /*dropHandler: function (event) {
	    event.stopPropagation();
	    event.preventDefault();
	    var e = event.originalEvent;
	    e.dataTransfer.dropEffect = 'copy';
	    
	    this.pictureFile = e.dataTransfer.files[0];
	
	    //Read the image file from the local file system and display it in the img tag
	    var reader = new FileReader();
	    reader.onloadend = function () {
	        $('#picture').attr('src', reader.result);
	    };
	    reader.readAsDataURL(this.pictureFile);
	},*/
        	    
});