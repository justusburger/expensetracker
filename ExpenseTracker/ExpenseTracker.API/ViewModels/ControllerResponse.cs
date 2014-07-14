using Nancy;

namespace ExpenseTracker.API.ViewModels
{
    public class ControllerResponse<T>
    {
        public HttpStatusCode Status { get; set; }
        public T Model { get; set; }

        public ControllerResponse(HttpStatusCode status, T model)
        {
            Status = status;
            Model = model;
        }
    }
}