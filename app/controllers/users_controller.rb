class UsersController < ApplicationController

    skip_before_action :authorize, only: [:create]

    def index
        render json: User.all
    end

    def show 
        render json: @current_user
    end
    
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def update
        render json: @current_user.update!(user_params), status: :accepted
    end
    
    def destroy
        @current_user.destroy 
        head :no_content
    end

    def hasPosted?
        # GET
        # MAPPED
        # NESTED ARRS IN ARRS
        # FLATTEN TO MAKE IT SHALLOW
        hasPosted = current_user.groups.map{|g| g.a_roll_calls.filter{|rc| !rc.roll_call_posts.find_by(user_id: current_user.id)}}.flatten
        
        render json: hasPosted
    end

    def userPosts
        render json: @current_user, serializer: UserShowPostsSerializer
    end

    def updateInfo
        if params.has_key?(:avatar) && params.has_key?(:bio)
            @current_user.update_attribute(:bio, params[:bio])
            @current_user.update_attribute(:avatar, params[:avatar])
        elsif params[:avatar]
            @current_user.update_attribute(:avatar, params[:avatar])
        elsif params[:bio]
            @current_user.update_attribute(:bio, params[:bio])
        end
        render json: @current_user, status: :accepted

    end
    
    private

    def user_params
        params.permit(:username, :email, :password, :bio)
    end
    
end
