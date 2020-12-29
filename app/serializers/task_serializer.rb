class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :due, :priority
end
