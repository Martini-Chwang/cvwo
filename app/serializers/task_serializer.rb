class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :priority, :due
end
